class Api::V1::SessionsController < Api::V1::MasterApiController
	def create
		render template: "api/v1/sessions/index"
	end
end
