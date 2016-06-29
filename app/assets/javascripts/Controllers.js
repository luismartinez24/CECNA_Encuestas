angular.module("Controller",[])
.controller("Auth",['$scope','auth','ToDoService','$timeout',function($scope,auth,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout, ToDoService);

    angular.extend($scope, {
        AuthData: {}
    });

    angular.extend($scope, {
        signin: function() {
            auth.login({'user':$scope.AuthData.user,'password':$scope.AuthData.password})
            .success(function(data) {
               $scope.create(data,'Login',ToDoService,$timeout);
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

    $scope.getAll('Encuestas','',ToDoService,$timeout,'');

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

}]);