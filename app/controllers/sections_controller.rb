class SectionsController < ApplicationController
    before_action :authenticate_user!, only: [:new, :show]
    before_action :set_poll, only: [:new, :show]
    before_action :set_section, only: [:show]

    def new
    end
    def show
    end

    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:polls])
        # if @poll.blank?
        #     error!("Recurso no encontrado",:not_found)
        # end
    end
    def set_section
        @section = Section.find_by_id(params[:sections])
        # if @poll.blank?
        #     error!("Recurso no encontrado",:not_found)
        # end
    end
end