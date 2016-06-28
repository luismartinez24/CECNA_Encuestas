json.array! @polls do |poll|
	json.partial! "api/v1/resource", resource: poll
	json.set! :links do
		json.set! :self, url_for(request.original_url + '/'+ poll.id.to_s)
	end
	json.set! :relationships do
		json.partial! "api/v1/relationships", resource: poll.user
	end
end