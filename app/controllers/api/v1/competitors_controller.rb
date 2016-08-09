class Api::V1::CompetitorsController < Api::V1::MasterApiController
    before_action :set_poll

    def create
        @competitor = @poll.competitors.new()
        if @competitor.save
            render template: "api/v1/competitors/show"
        else
            error_array!(@competitor.errors,:unprocessable_entity)
        end
    end

    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:poll_id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end
end