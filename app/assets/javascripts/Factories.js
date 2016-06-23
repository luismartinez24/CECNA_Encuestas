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
}]);