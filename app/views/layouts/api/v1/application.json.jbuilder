json.set! :meta do
	json.set! :copyright, 'Copyright '+ Date.today.strftime("%Y")+ ' SLAM24'
	json.set! :author, 'Luis Martínez'
		json.set! :data do
			json.set! :email, 'luismartinez242011@gmail.com'
		end
end

json.set! :links do
	json.set! :self, url_for(request.original_url)
end

json.data JSON.parse(yield)
json.errors @errors

json.set! :jsonapi do
	json.set! :version, '1.0'
end