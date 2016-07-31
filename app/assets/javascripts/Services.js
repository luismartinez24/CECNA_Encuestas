angular.module("ToDoService",[])
.service("ToDoService", [ 'login','poll','section',function(login,poll,section){

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
				ToDoService.msg($scope,$timeout, ToDoService);
				}, 3000);
			},
			success: function(ToDoService,$timeout,data){
				$scope.msgsuccess = false;
				$scope.msg = 'El recurso se creo con éxito';
				$scope.msgclose($timeout, ToDoService);
			},
			info: function(entity,aux,status){
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
				};
				if (data.status == 422) {
					$scope.errorMessages = data.data.errors;
				};
			},
		});
	},
	this.http = function($scope,$timeout, ToDoService){
		ToDoService.msg($scope,$timeout, ToDoService);
		angular.extend($scope,{
			create: function(data,entity,id1){
				if (entity == 'Login') {
					login.save(data, function(data){
						$scope.loading = false;
						window.location.href = data.data.to;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'poll') {
					poll.save(data, function(data){

					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'section') {
					section.save({'polls':id1},data, function(data){
						$scope.success(ToDoService,$timeout,data);
						$scope.getSection.push(data.data);
						$scope.CreateData.section.name = '';
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			update: function(data,entity,id1,id2){
				if (entity == 'section') {
					section.update({'sections':id1,'polls':id2},data, function(data){
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			delete: function(entity,id1,id2,index){
				if (entity == 'section') {
					section.remove({'sections':id1,'polls':id2}, function(data) {
						$scope.getSection.splice(index, 1);
						for ( var i = 0; i < $scope.getSection.length; i++ ) {
							$scope.getSection[i].attributes.rank = i+1;
						}
						angular.forEach($scope.getSection,function(value,index){
							$scope.update(value.attributes,'section',value.id,id2);
						});
					}, function(data){
						$scope.errors(data,ToDoService,$timeout);
					});
				};
			},
			getAll: function(entity,option,id1){
				if (entity == 'Encuestas') {
					poll.query({'option':option}, function(data){
						$scope.getPolls =  data.data;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
				if (entity == 'section') {
					section.query({'option':option,'polls':id1}, function(data){
						$scope.getSection =  data.data;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			}
		});
	}
}]);