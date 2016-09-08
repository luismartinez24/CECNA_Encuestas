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
            auth.login({'username':$scope.AuthData.username,'password':$scope.AuthData.password,'system':'seem'})
            .success(function(data) {
               $scope.create(data,'Login');
            })
            .error(function(data, status) {
                $scope.loading = false;
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
    ToDoService.config($scope);

    angular.extend($scope, {
        AuthData: {},
        CreateData:{
            poll:{
                title:'',
                description:'',
                color:'#26a69a'
            }
        }
    });
    $scope.ckeditorConfig();
    $scope.page = 0;
    $scope.busy = false;
    $scope.reloadList = true;
    CKEDITOR.instances['ckeditor'].setData('Describa de forma clara aspectos que caracterizan la encuesta a aplicar');

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
        },
        reloadPoll: function(){
            $scope.page = 0;
            $scope.busy = false;
            $scope.reloadList = true;
            $scope.nextPage();
        }
    });

    angular.extend($scope,{
        save: function(CreateData){
            $scope.CreateData.poll.color = $("#colorpicker").spectrum("get").toHexString();
            $scope.CreateData = CreateData;
            $scope.CreateData.poll.description =  CKEDITOR.instances['ckeditor'].getData();
            $scope.create($scope.CreateData,'poll');
        },
        nextPage: function(){
            $scope.busy = true;
            $scope.reloadList = true;
            $scope.page++;
            $scope.getAll('Encuestas','user',ToDoService,$timeout,$scope.page);
        }
    });

}])
.controller("pollshow",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);
    ToDoService.graph($scope,$timeout,ToDoService);
    ToDoService.config($scope);
    ToDoService.list($scope);

    angular.extend($scope,{
        poll: document.getElementById("id").value,
        UpdateData:{
            poll:{}
        }
    });

    $scope.getAll('section','',$scope.poll);
    $scope.getEntity('poll',$scope.poll,'','',true);

    angular.extend($scope,{
        Option: function(obj,option,graph){
            var count = 0;
            var value = 0;
            var countOption = 0;
            angular.forEach(obj,function(value,index){
                count++;
            });
            angular.forEach(obj,function(value,index){
                if (value.attributes.option == option) {
                    countOption++;
                };
            });
            if (count == 0) {
                value = 0;
            }else{
                if (graph == false) {
                    value = (countOption/count)*100;
                }else{
                    value = countOption;
                }
            };
            value = Math.round(value);
            return value;
        },
        chart: function(title,id,type,obj){
            if (type == 1) {
                var category = ['1', '2', '3', '4', '5'];
                var array = [$scope.Option(obj,1,true),$scope.Option(obj,2,true),$scope.Option(obj,3,true),$scope.Option(obj,4,true),$scope.Option(obj,5,true)];
            };
            if (type == 2) {
                var category = ['1', '2', '3', '4', '5','6','7','8','9','10'];
                var array = [$scope.Option(obj,1,true),$scope.Option(obj,2,true),$scope.Option(obj,3,true),$scope.Option(obj,4,true),$scope.Option(obj,5,true),$scope.Option(obj,6,true),$scope.Option(obj,7,true),$scope.Option(obj,8,true),$scope.Option(obj,9,true),$scope.Option(obj,10,true)];
            };
            if (type == 3) {
                var category = ['Excelente', 'M. Bueno', 'Bueno', 'Regular'];
                var array = [$scope.Option(obj,1,true),$scope.Option(obj,2,true),$scope.Option(obj,3,true),$scope.Option(obj,4,true)];
            };
            $scope.bar(title,id,category,array);
        },
        edit: function(obj,option){
            obj.poll.description =  CKEDITOR.instances['ckeditor'].getData();
            obj.poll.status = $scope.Status.id;
            $scope.update(obj,'poll','',obj.poll.id,'',option);
        },
        destroy: function(option){
            $scope.delete('poll',$scope.poll,'','','',option);
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
    $scope.EditSection = false;
    $scope.reloadList = true;

    $scope.$watch("getSection",function ( newValue, oldValue ) {
        if ($scope.getSection != null) {
            for ( var i = 0; i < newValue.length; i++ ) {
                newValue[i].attributes.rank = i+1;
            }
        };
    }, true);

    angular.extend($scope,{
        save: function(option){
            if (option) {
                $scope.create($scope.CreateData,'section',$scope.poll);
            }else{
                $scope.update($scope.CreateData,'section',$scope.CreateData.section.id,$scope.poll,'',true,$scope.index);
            };
        },
        updateList: function(obj){
            $scope.cancel();
            angular.forEach(obj,function(value,index){
                $scope.update(value.attributes,'section',value.id,$scope.poll,'','rank');
            });
            $scope.info('posición','La','actualizó');
        },
        destroy: function(obj,objs){
            var index = $scope.getSection.indexOf(obj);
            $scope.delete('section',obj.id,$scope.poll,index);
        },
        reload: function(){
            $scope.cancel();
            $scope.reloadList = true;
            $scope.getAll('section','',$scope.poll);
        },
        edit: function(obj){
            $scope.index = $scope.getSection.indexOf(obj);
            $scope.EditSection = true;
            $scope.CreateData.section.name = obj.attributes.name;
            $scope.CreateData.section.id = obj.attributes.id;
            $scope.CreateData.section.rank = obj.attributes.rank;
        },
        cancel: function(){
            $scope.CreateData.section.name = '';
            $scope.CreateData.section.id = '';
            $scope.EditSection = false;
        }
    });

}])
.controller("question",['$scope','ToDoService','$timeout',function($scope,ToDoService,$timeout){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);
    ToDoService.list($scope);

    angular.extend($scope,{
        CreateData:{
            question:{
                category: '',
                description: '',
                rank:'',
                id:''
            }
        },
        poll: document.getElementById("poll").value,
        section: document.getElementById("section").value,
        category: ''
    });

    $scope.getAll('question','',$scope.poll,$scope.section);

    $scope.$watch("getQuestion",function ( newValue, oldValue ) {
        if ($scope.getQuestion != null) {
            for ( var i = 0; i < newValue.length; i++ ) {
                newValue[i].attributes.rank = i+1;
            }
        };
    }, true);

    $scope.Category = $scope.typeQuestion[0];
    $scope.EditQestion = false;
    $scope.reloadList = true;

    angular.extend($scope,{
        save: function(option){
            $scope.CreateData.question.category = $scope.Category.id;

            if ($scope.Category.id == 0) {
                $scope.CreateData.question.category = '';
            }
            if (option) {
                $scope.create($scope.CreateData,'question',$scope.poll,$scope.section);
            }else{
                $scope.update($scope.CreateData,'question',$scope.CreateData.question.id,$scope.poll,$scope.section,true,$scope.index);
            };

        },
        updateList: function(obj){
            $scope.cancel();
            angular.forEach(obj,function(value,index){
                $scope.update(value.attributes,'question',value.id,$scope.poll,$scope.section,'rank');
            });
            $scope.info('posición','La','actualizó');
        },
        destroy: function(obj,objs){
            var index = $scope.getQuestion.indexOf(obj);
            $scope.delete('question',obj.id,$scope.poll,$scope.section,index);
        },
        reload: function(){
            $scope.reloadList = true;
            $scope.cancel();
            $scope.getAll('question','',$scope.poll,$scope.section);
        },
        edit: function(obj){
            $scope.index = $scope.getQuestion.indexOf(obj);
            $scope.EditQestion = true;
            $scope.CreateData.question.description = obj.attributes.description;
            $scope.CreateData.question.id = obj.attributes.id;
            $scope.CreateData.question.rank = obj.attributes.rank;
            $scope.Category = $scope.typeQuestion[obj.attributes.category];
        },
        cancel: function(){
            $scope.CreateData.question.description = '';
            $scope.CreateData.question.id = '';
            $scope.CreateData.question.category = '';
            $scope.Category = $scope.typeQuestion[0];
            $scope.EditQestion = false;
        }
    });

}])
.controller("resolve",['$scope','ToDoService','$timeout','Constants',function($scope,ToDoService,$timeout,Constants){

    ToDoService.msg($scope,$timeout, ToDoService);
    ToDoService.http($scope,$timeout,ToDoService);

    angular.extend($scope,{
        poll: document.getElementById("poll").value,
        response: [],
        error: []
    });

    $scope.getEntity('poll',$scope.poll,'','');
    $scope.getAll('section','',$scope.poll);

    angular.extend($scope,{
        save: function(obj){
            var verification = true;
            angular.forEach(obj,function(value,index){
                angular.forEach(value.relationships.questions,function(value,index){
                    if (value.attributes.category != 1 && $scope.response[value.id] == undefined) {
                        verification = false;
                        $scope.error[value.id]  = true;
                    }else{
                        $scope.error[value.id]  = false;
                    };
                });
            });
            if (verification == true) {
                $scope.create('','competitor',$scope.poll,'',obj);
            };
        },
        responsePoll: function(obj,competitor,poll){
            angular.forEach(obj,function(value,index){
                angular.forEach(value.relationships.questions,function(value,index){
                    angular.extend($scope,{
                        CreateData:{
                            answer:{
                                competitor_id: '',
                                comment: '',
                                option: ''
                            }
                        }
                    });
                    $scope.CreateData.answer.competitor_id = competitor;
                    if (value.attributes.category == 1) {
                        $scope.CreateData.answer.comment = $scope.response[value.id];
                        $scope.create($scope.CreateData,'answer',value.attributes.id,poll,value.attributes.section_id);
                    };
                    if (value.attributes.category == 2) {
                        $scope.CreateData.answer.option = $scope.response[value.id];
                        $scope.create($scope.CreateData,'answer',value.attributes.id,poll,value.attributes.section_id);
                    };
                    if (value.attributes.category == 3) {
                        $scope.CreateData.answer.option = $scope.response[value.id];
                        $scope.create($scope.CreateData,'answer',value.attributes.id,poll,value.attributes.section_id);
                    };
                    if (value.attributes.category == 4) {
                        $scope.CreateData.answer.option = $scope.response[value.id];
                        $scope.create($scope.CreateData,'answer',value.attributes.id,poll,value.attributes.section_id);
                    };
                });
            });
            window.location.href = '/';
        }
    });
}]);