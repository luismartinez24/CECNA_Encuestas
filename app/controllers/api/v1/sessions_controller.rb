class Api::V1::SessionsController < Api::V1::MasterApiController
	before_action :user_params, only: [:create]
	def create
		auth = params[:auth]
		user = User.from_cecna(auth)

		userUpdate = User.find(user.id)
		userUpdate.update(user_params)

		if user.persisted?
			session[:user_id] = user.id
			render template: "api/v1/sessions/index"
		else
			render json: { error: user.errors.full_messages.to_s }, status: :unprocessable_entity
		end
	end
	def destroy
		session[:user_id] = nil
		redirect_to('/')
	end

	private

	def user_params
		params.require(:auth).permit(:username,:email,:path)
	end
end