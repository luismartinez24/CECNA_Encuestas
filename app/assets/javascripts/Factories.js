angular.module("Factories",[])
.factory("auth", ['$http','Constants', function($http,Constants){
	return {
		login : function(data) {
			return $http({
				method: 'POST',
				url: Constants.URL_CECNA+'authenticate',
				headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
				data: $.param(data)
			});
		}
	};
}])
.factory("login", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'sessions/:sessions',{},{
		save: {method:'POST'}
	});
}])
.factory("poll", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'polls/:polls',{},{
		query: { method:'GET', isArray: false },
		save: {method:'POST'},
		get: {method:'GET', params:{id:'@id'}, isArray:false}
	});
}])
.factory("section", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'polls/:polls/sections/:sections',{},{
		query: { method:'GET', isArray: false },
		save: {method:'POST'},
		update: {method:'PUT'},
		remove: {method:'DELETE'},
	});
}])
.factory("question", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'polls/:polls/sections/:sections/questions/:questions',{},{
		query: { method:'GET', isArray: false },
		save: {method:'POST'},
		update: {method:'PUT'},
		remove: {method:'DELETE'},
	});
}])
.factory("competitors", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'polls/:polls/competitors/:competitors',{},{
		save: {method:'POST'}
	});
}])
.factory("answers", ['$resource','Constants' ,function($resource,Constants){
	return $resource(Constants.URL_API+'polls/:polls/sections/:sections/questions/:questions/answers/:answers',{},{
		save: {method:'POST'}
	});
}]);
