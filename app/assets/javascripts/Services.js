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
				}, 4000);
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
					if (data.data.errors[0]) {
						$scope.msginfo = false;
						$scope.msg = data.data.errors[0];
						$scope.msgclose($timeout, ToDoService);
						$scope.errorMessages = data.data.errors;
					}
				};
			}
		});
	},
	this.list = function($scope){
		angular.extend($scope,{
			typeQuestion: [{id: 0,label: 'Selecciones una opción'},
						{id: 1,label: 'Respuesta breve'},
						{id: 2,label: 'Casillas de verificación en letras'},
						{id: 3,label: 'Casillas de verificación en numeros 1-5'},
						{id: 4,label: 'Casillas de verificación en numeros 1-10'}],
			statusPoll: [{id: 0,label: 'En edición'},
						{id: 1,label: 'Activa'},
						{id: 2,label: 'Finalizada'}]

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
						$scope.success(ToDoService,$timeout,data);
						$scope.CreateData.poll.title = '';
						$scope.CreateData.poll.description = '';
						$("#colorpicker").spectrum("set","#26a69a");
						CKEDITOR.instances['ckeditor'].setData('Describa de forma clara aspectos que caracterizan la encuesta a aplicar');
						$scope.CreateData.poll.expires_at = new Date();
						var $input = $('.datepicker').pickadate();
						var picker = $input.pickadate('picker');
						picker.set('select', new Date(), { format: 'yyyy-mm-dd' });
						$scope.reloadPoll();
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
						$scope.getQuestion.push(data.data);
						$scope.cancel();
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			update: function(data,entity,id1,id2,id3,option,index){
				if (entity == 'section') {
					section.update({'sections':id1,'polls':id2,'option':option},data, function(data){
						if (option == true) {
							$scope.info('sección','La','actualizó');
							$scope.cancel();
							$scope.getSection[index] = data.data;
						};
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'poll') {
					poll.update({'polls':id2,'option':option},data, function(data){
						$scope.info('encuesta','La','actualizó');
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'question') {
					question.update({'sections':id3,'polls':id2,'questions':id1,'option':option},data, function(data){
						if (option) {
							$scope.info('pregunta','La','actualizó');
							$scope.cancel();
							$scope.getQuestion[index] = data.data;
						};
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			delete: function(entity,id1,id2,id3,index,option){
				if (entity == 'poll') {
					poll.remove({'polls':id1,'option':option}, function(data) {
						$scope.info('recurso','El','elimino');
						if (option != 'poll') {
							$scope.getAll('section','',id1);
							$scope.getEntity('poll',id1,'','',true);
						}else{
							window.location.href = '/encuestas';
						}
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
				if (entity == 'section') {
					section.remove({'sections':id1,'polls':id2}, function(data) {
						$scope.getSection.splice(index, 1);
						for ( var i = 0; i < $scope.getSection.length; i++ ) {
							$scope.getSection[i].attributes.rank = i+1;
						}
						angular.forEach($scope.getSection,function(value,index){
							$scope.update(value.attributes,'section',value.id,id2);
						});
						$scope.info('recurso','El','elimino');
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};

				if (entity == 'question') {
					question.remove({'sections':id3,'polls':id2,'questions':id1}, function(data) {
						$scope.getQuestion.splice(index, 1);
						for ( var i = 0; i < $scope.getQuestion.length; i++ ) {
							$scope.getQuestion[i].attributes.rank = i+1;
						}
						angular.forEach($scope.getQuestion,function(value,index){
							$scope.update(value.attributes,'question',value.id,id2,id3);
						});
						$scope.info('recurso','El','eliminó');
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			getAll: function(entity,option,id1,id2,page){
				if (entity == 'Encuestas') {
					poll.query({'option':option,'page':page}, function(data){
						$timeout(function(){
							if (page == 1) {
								$scope.getPolls = data.data;
							}else{
								angular.forEach(data.data,function(value,index){
									$scope.getPolls.push(value);
								});
							};
							if (data.data.length > 0) {
								$scope.busy = false;
							}else{
								$scope.busy = true;
							};
							$scope.reloadList = false;
						}, 3000);
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
				if (entity == 'section') {
					section.query({'option':option,'polls':id1}, function(data){
						$scope.getSection =  data.data;
						$scope.reloadList = false;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
				if (entity == 'question') {
					question.query({'option':option,'polls':id1,'sections':id2}, function(data){
						$scope.getQuestion =  data.data;
						$scope.reloadList = false;
					}, function(data){
						$scope.errorsData(data,ToDoService,$timeout);
					});
				};
			},
			getEntity: function(entity,id,option,search,edit){
				if (entity == 'poll') {
					poll.get({'polls': id,'option':option}, function(data){
						$scope.pollData = data.data.attributes;
						if (edit) {
							$scope.Status = $scope.statusPoll[$scope.pollData.status];
							$scope.ckeditorConfig();
							$scope.UpdateData.poll = data.data.attributes;
							CKEDITOR.instances['ckeditor'].setData($scope.UpdateData.poll.description);
							$("#colorpicker").spectrum("set",$scope.UpdateData.poll.color);
							var $input = $('.datepicker').pickadate();
						var picker = $input.pickadate('picker');
							picker.set('select', $scope.UpdateData.poll.expires_at, { format: 'yyyy-mm-dd' });
						}
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
	},
	this.config = function($scope){
		angular.extend($scope,{
			ckeditorConfig: function(){
				try{
				var editor = CKEDITOR.instances.ckeditor;
				if (editor) {
					editor.destroy(true);
				}
				CKEDITOR.replace("ckeditor",{
					uiColor: '#455a64',
					toolbar: 'mini'
				});
				}catch(e){
				}
			}
		});
	}
}]);