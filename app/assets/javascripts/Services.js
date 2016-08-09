angular.module("ToDoService",[])
.service("ToDoService", ['login','poll','section','question','competitors','Constants','answers',function(login,poll,section,question,competitors,Constants,answers){

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
				if (data.status == 422 || data.status == 404) {
					$scope.errorMessages = data.data.errors;
				};
			},
		});
	},
	this.http = function($scope,$timeout, ToDoService){
		ToDoService.msg($scope,$timeout, ToDoService);
		angular.extend($scope,{
			create: function(data,entity,id1,id2,obj){
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

				if (entity == 'competitor') {
					competitors.save({'polls':id1},data, function(data){
						$scope.competitor = data.data.attributes.id;
						$scope.responsePoll(obj,data.data.attributes.id,id1);
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'answer') {
					answers.save({'questions':id1,'polls':id2,'sections':obj},data, function(data){

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

				if (entity == 'question') {
					question.save({'polls':id1,'sections':id2},data, function(data){
						$scope.success(ToDoService,$timeout,data);
						$scope.CreateData.question.description = '';
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
			getAll: function(entity,option,id1,id2){
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
				if (entity == 'question') {
					question.query({'option':option,'polls':id1,'sections':id2}, function(data){
						$scope.getQuestion =  data.data;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			getEntity: function(entity,id,option,search){
				if (entity == 'poll') {
					poll.get({'polls': id,'option':option}, function(data){
						$scope.pollData = data.data.attributes;
						if (search) {
							var url = '/contestar?option=';
							window.location.href = url.concat(id);
						};
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			}
		});
	},
	this.graph = function($scope,$timeout, ToDoService){
		angular.extend($scope,{
			bar: function(vtitle,vid,category,array){
				var chart = {
					type: 'bar'
				}
				var title = {
					text: vtitle
				};
				var subtitle = {
					text: '<a href="https://en.wikipedia.org/wiki/World_population">www.cecna.edu.ni/estadisticas</a>'
				};
				var xAxis = {
					categories: category
				};
				var yAxis = {
					title: {
						text: 'Participantes'
					},
					plotbar: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				};

				var tooltip = {
					valueSuffix: ''
				}
				  var plotOptions = {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				}

				var legend = {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 80,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				};

				var series =  [
					{
						name: 'Participantes',
						data: array
					}
				];

				var json = {};
				json.chart = chart;
				json.title = title;
				json.subtitle = subtitle;
				json.xAxis = xAxis;
				json.yAxis = yAxis;
				json.tooltip = tooltip;
				json.legend = legend;
				json.series = series;
				json.plotOptions = plotOptions;

				$('#'+vid).highcharts(json);
			}
		});
	}
}]);