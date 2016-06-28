json.set! resource.class.name.underscore.pluralize do
	json.type resource.class.name.underscore.pluralize
	json.id resource.id
	json.attributes resource.attributes
	json.set! :links do
		json.set! :self, url_for(request.protocol+request.host_with_port + '/api/v1/'+ resource.class.name.underscore.pluralize+'/'+ resource.id.to_s)
	end
end