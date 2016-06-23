class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
	before_action :set_jbuilder_defaults
	protected
	def set_jbuilder_defaults
		@errors = []
	end
	def error!(message,status)
		@errors << message
		response.status = status
		render template: "api/v1/errors"
	end
	def error_array!(array,status)
		@errors = @errors + array
		response.status = status
		render template: "api/v1/errors"
	end
end
