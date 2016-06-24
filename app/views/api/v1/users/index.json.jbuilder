json.array! @users do |user|
	json.partial! "api/v1/resource", resource: user
	json.set! :links do
		json.set! :self, url_for(request.original_url + '/'+ user.id.to_s)
	end
end