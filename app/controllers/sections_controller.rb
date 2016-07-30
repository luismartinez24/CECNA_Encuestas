class SectionsController < ApplicationController
    before_action :authenticate_user!, only: [:new]
    before_action :set_poll, only: [:new]

    def new
    end

    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:polls])
        # if @poll.blank?
        #     error!("Recurso no encontrado",:not_found)
        # end
    end

end