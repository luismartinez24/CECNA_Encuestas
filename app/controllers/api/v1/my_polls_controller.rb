class Api::V1::MyPollsController < Api::V1::MasterApiController
    before_action :auth, only: [:create]
    before_action :set_poll, only: [:show,:update]

    def index
        if params[:option] == 'user'
            @polls = MyPoll.where(user_id: @current_user).paginate(:page => params[:page], :per_page => 20).created_at
        else
            @polls = MyPoll.all.paginate(:page => params[:page], :per_page => 20)
        end
    end
    def show
    end
    def create
        @poll = @current_user.my_polls.new(my_polls_params)
        if @poll.save
            render template: "api/v1/my_polls/show"
        else
            error_array!(@poll.errors,:unprocessable_entity)
        end
    end
    def update
        if @poll.user == @current_user
            if @poll.update(my_polls_params)
                render template: "api/v1/my_polls/show"
            else
                error_array!(@poll.errors,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar secciones a esta encuesta",:unauthorized)
        end
    end

    private

    def my_polls_params
        params.require(:poll).permit(:title,:description,:expires_at,:color,:status)
    end
    def set_poll
        if params[:option] == 'code'
            @poll = MyPoll.where(code: params[:id]).first
            if @poll.blank?
                error!("Recurso no encontrado",:not_found)
            end
        else
            @poll = MyPoll.find_by_id(params[:id])
            if @poll.blank?
                error!("Recurso no encontrado",:not_found)
            end
        end
    end
end