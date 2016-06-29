class Api::V1::MyPollsController < Api::V1::MasterApiController
    before_action :auth, only: [:create]
    before_action :set_poll, only: [:show]

    def index
        @polls = MyPoll.where(user_id: @current_user)
    end
    def show
    end
    def create
        @poll = @current_user.my_polls.new(my_polls_params)
        if @poll.save
            render template: "api/v1/my_polls/show"
        else
            error_array!(@poll.errors.full_messages,:unprocessable_entity)
        end
    end

    private

    def my_polls_params
        params.require(:poll).permit(:title,:description,:expires_at,:color,:status)
    end
    def set_poll
        @poll = MyPoll.find_by_id(params[:id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end
end