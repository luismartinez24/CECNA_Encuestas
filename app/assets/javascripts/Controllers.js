angular.module("Controller",[])
.controller("Auth",['$scope','auth','ToDoService','$timeout',function($scope,auth,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout, ToDoService);

    angular.extend($scope, {
        AuthData: {},
        loading: false
    });

    angular.extend($scope, {
        signin: function() {
            $scope.loading = true;
            auth.login({'user':$scope.AuthData.user,'password':$scope.AuthData.password})
            .success(function(data) {
               $scope.create(data,'Login');
            })
            .error(function(data, status) {
               ToDoService.msg($scope,$timeout, ToDoService);
               if(status == 401) {
                    $scope.msg = '¡Vaya! Parece que olvidaste tu contraseña. Vuelva a intentarlo o consulte al administrador del sitio.';
                    $scope.msgdanger = false;
               };
               if(status == 500) {
                    $scope.msg = 'Error de servidor interno. intente de nuevo o consulte al administrador de sitio.';
                    $scope.msgdanger = false;
               };
               if(status == 403) {
                    $scope.msg = 'Este usuario no esta habilitado. intente de nuevo o consulte al administrador de sitio.';
                    $scope.msgdanger = false;
               };
               if (status == 422) {
                    $scope.errorMessages = data;
               };
            });
        }
    });

}])
.controller("polls",['$scope','ToDoService','$timeout','$filter',function($scope,ToDoService,$timeout,$filter){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout, ToDoService);

    angular.extend($scope, {
        AuthData: {}
    });

    $scope.getAll('Encuestas','user',ToDoService,$timeout,'');

    angular.extend($scope,{
        date: function(date){
            var expired = '';
            var current = '';

            var fecha = new Date();
            current = $filter('date')(fecha, 'yyyy-MM-dd');

            var dateOut = new Date(date);
            dateOut.setDate(dateOut.getDate() + 1);
            expired = $filter('date')(dateOut, 'yyyy-MM-dd');

            if (current > expired) {
                return true;
            };
        }
    });

}])
.controller("poll",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        CreateData:{
            poll:{
                description:'',
                color: '#26a69a'
            }
        }
    });

    angular.extend($scope,{
        save: function(CreateData){
            $scope.CreateData = CreateData;
            $scope.CreateData.poll.description =  CKEDITOR.instances['ckeditor'].getData();
            $scope.create($scope.CreateData,'poll');
        }
    });

}])
.controller("seccion",['$scope','ToDoService','$timeout', function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        CreateData:{
            section:{
                name:''
            }
        },
        UpdateData:{
            section:{
                rank: ''
            }
        },
        newObj:{},
        idvar: document.getElementById("idvar").value,
        form: {}
    });

    $scope.getAll('section','',$scope.idvar);

    $scope.$watch("getSection",function ( newValue, oldValue ) {
        if ($scope.getSection != null) {
            for ( var i = 0; i < newValue.length; i++ ) {
                newValue[i].attributes.rank = i+1;
            }
        };
    }, true);

    angular.extend($scope,{
        save: function(CreateData){
            $scope.create(CreateData,'section',$scope.idvar);
        },
        updateList: function(obj){
            angular.forEach(obj,function(value,index){
                $scope.update(value.attributes,'section',value.id,$scope.idvar);
            });
            $scope.info('posición','La','actualizó');
        },
        destroy: function(obj,objs){
            var index = $scope.getSection.indexOf(obj);
            $scope.delete('section',obj.id,$scope.idvar,index);
            $scope.info('posición','La','elimino');
        }
    });

}]);