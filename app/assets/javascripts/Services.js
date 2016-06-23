angular.module("ToDoService",[])
.service("ToDoService", [ 'login',function(login){

	this.msg = function($scope,$timeout, ToDoService){

		angular.extend($scope, {
			msg: {},
			msgdanger: true,
			msginfo: true,
			msgwarning: true,
			msgsuccess: true,
			errorMessages: [],
			msgclose: function($timeout, ToDoService) {
				$scope.errorMessages = '';
				$timeout(function(){
				ToDoService.msg($scope);
				}, 3000);
			},
			success: function(ToDoService,$timeout,entity,aux,name){
				$scope.msgsuccess = false;
				if (!name) {
					$scope.msg = aux+' '+entity+' se guardo con éxito';
				}else{
					$scope.msg = aux+' '+entity+' "'+name+'" se guardo con éxito';
				};
				$scope.createData = {};
				$scope.createDatadetail = {};
				$scope.msgclose($timeout, ToDoService);
			},
			successModal: function(ToDoService,$timeout,entity,aux,name){
				$scope.msgsuccess = false;
				if (!name) {
					$scope.msg = aux+' '+entity+' se guardo con éxito';
				}else{
					$scope.msg = aux+' '+entity+' "'+name+'" se guardo con éxito';
				};
				$scope.createData = {};
				$scope.defaultTime();
				$scope.msgclose($timeout, ToDoService);
			},
			info: function(entity,aux,status,ToDoService,$timeout){
					ToDoService.msg($scope,$timeout, ToDoService);
					$scope.msginfo = false;
					$scope.msg = aux+' '+entity+' se '+status+' con éxito ';
					$scope.msgclose($timeout, ToDoService);
			},
			errorsData: function(data,ToDoService,$timeout){
				ToDoService.msg($scope,$timeout, ToDoService);
				if (data.status == 500) {
					$scope.msgdanger = false;
					$scope.msg = 'Error de servidor interno. intente de nuevo o consulte al administrador de sitio';
					$scope.msgclose($timeout, ToDoService);
				} else{
					$scope.errorMessages = data;
				};
			},
			errors: function(data,ToDoService,$timeout){
				ToDoService.msg($scope,$timeout, ToDoService);
				if (data.status == 500) {
					$scope.msgdanger = false;
					$scope.msg = 'Error de servidor interno. intente de nuevo o consulte al administrador de sitio';
					$scope.msgclose($timeout, ToDoService);
				};
			},
		});
	},
	this.http = function($scope,$timeout, ToDoService){
		angular.extend($scope,{
			create: function(data,entity,ToDoService,$timeout,id){
				if (entity == 'Login') {
					login.save(data, function(data){
						window.location.href = data.data.to;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});

				};
			}			
		});
	}
}]);