class ResolveController < ApplicationController
	before_action :set_poll, only: [:index]

	def index
	end

	private

	def set_poll
		@poll = MyPoll.where(code: params[:option],status: 1).first
		if @poll.blank?
			redirect_to('/')
		else
			if !@poll.is_valid?
				redirect_to('/')
			end
		end
	end
end