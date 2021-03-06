class MyPollController < ApplicationController
	before_action :authenticate_user!, only: [:index, :show]
	before_action :set_poll, only: [:show]

	def index
	end
	def show
	end

	private

	def set_poll
		@poll = MyPoll.find_by_id(params[:polls]) or not_found
	end
end
