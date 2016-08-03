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
        },
        verification: function(){
            $scope.getEntity('poll',$scope.code,'code',true);
        }
    });

}])
.controller("polls",['$scope','ToDoService','$timeout','$filter',function($scope,ToDoService,$timeout,$filter){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout, ToDoService);

    angular.extend($scope, {
        AuthData: {},
        CreateData:{
            poll:{
                description:'',
                color: '#26a69a'
            }
        }
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

    angular.extend($scope,{
        save: function(CreateData){
            $scope.CreateData = CreateData;
            $scope.CreateData.poll.description =  CKEDITOR.instances['ckeditor'].getData();
            $scope.create($scope.CreateData,'poll');
            console.log($scope.CreateData);
        }
    });

}])
.controller("pollshow",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        description: document.getElementById("description").value,
        poll: document.getElementById("id").value
    });

    $scope.getAll('section','',$scope.poll);

    angular.extend($scope,{
        questions: function(obj){
            //$scope.getAll('question','',$scope.poll,obj.id);
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
        poll: document.getElementById("poll").value,
        form: {}
    });

    $scope.getAll('section','',$scope.poll);

    $scope.$watch("getSection",function ( newValue, oldValue ) {
        if ($scope.getSection != null) {
            for ( var i = 0; i < newValue.length; i++ ) {
                newValue[i].attributes.rank = i+1;
            }
        };
    }, true);

    angular.extend($scope,{
        save: function(CreateData){
            $scope.create(CreateData,'section',$scope.poll);
        },
        updateList: function(obj){
            angular.forEach(obj,function(value,index){
                $scope.update(value.attributes,'section',value.id,$scope.poll);
            });
            $scope.info('posición','La','actualizó');
        },
        destroy: function(obj,objs){
            var index = $scope.getSection.indexOf(obj);
            $scope.delete('section',obj.id,$scope.poll,index);
            $scope.info('posición','La','elimino');
        },
        questions: function(obj){
            var url = '/encuestas/'+$scope.poll+'/secciones/';
            window.location.href = url.concat(obj.attributes.id);
        }
    });

}])
.controller("question",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        CreateData:{
            question:{
                category: '',
                description: ''
            }
        },
        poll: document.getElementById("poll").value,
        section: document.getElementById("section").value,
        category: ''
    });

    $scope.getAll('question','',$scope.poll,$scope.section);

    $scope.$watch("CreateData.question.category",function ( newValue, oldValue ) {
        if ($scope.CreateData) {
            $scope.category = $scope.CreateData.question.category; 
        };
    }, true);

    angular.extend($scope,{
        save: function(){
            $scope.create($scope.CreateData,'question',$scope.poll,$scope.section);
        }
    });

}])
.controller("resolve",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        CreateData:{
            question:{
                category: '',
                description: ''
            }
        },
        poll: document.getElementById("poll").value,
        category: ''
    });

    $scope.getEntity('poll',$scope.poll,'','');
    $scope.getAll('section','',$scope.poll);

}]);