class Api::V1::MyPollsController < Api::V1::MasterApiController
    before_action :auth, only: [:create]
    before_action :set_poll, only: [:show,:update,:destroy]

    def index
        if params[:option] == 'user'
            @polls = MyPoll.where(user_id: @current_user).paginate(:page => params[:page], :per_page => 20).created_at
        else
            @polls = MyPoll.all.paginate(:page => params[:page], :per_page => 20)
        end
    end
    def show
        @competitors = Competitor.where(my_poll_id: @poll.id).count
        @indicators = Array({:competitors => @competitors})
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
            if (@resolve.blank? && @poll.status == 0) || params[:option] == 'state'
                if @poll.update(my_polls_params)
                    render template: "api/v1/my_polls/show"
                else
                    error_array!(@poll.errors,:unprocessable_entity)
                end
            else
                if @poll.status != 0
                    error!("La encuesta no esta en edición no puede ser actualizada, Verifique las restricciones de la encuesta",:unprocessable_entity)
                else
                    error!("La encuesta ha sido contestada no puede ser actualizada, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end
            end
        else
            error!("No tienes autorizado actualizar este recurso",:unauthorized)
        end
    end

    def destroy
        if @poll.user == @current_user
            if @poll.status == 0
                if params[:option] == 'competitor'
                    Competitor.where(my_poll_id: @poll.id).destroy_all
                end
                if params[:option] == 'structure'
                    Section.where(my_poll_id: @poll.id).destroy_all
                end
                if params[:option] == 'poll'
                    @poll.destroy
                end
                head :ok
            else
                error!("La encuesta no esta en edición, no puede eliminar el/los recurso/s, Verifique las restricciones de la encuesta",:unprocessable_entity)
            end
        else
            error!("No tienes autorizado eliminar este recurso",:unauthorized)
        end
    end

    private

    def my_polls_params
        if params[:option] == 'state'
            params.require(:poll).permit(:status,:option)
        else 
           params.require(:poll).permit(:title,:description,:expires_at,:color,:status,:option)
        end
    end
    def set_poll
        if params[:option] == 'code'
            @poll = MyPoll.find_by(code: params[:id],status: 1)
        else
            @poll = MyPoll.find_by_id(params[:id])
        end
        if @poll.blank?
            error!("Recurso no encontrado1",:not_found)
        else
            if !@poll.is_valid? && params[:option] == 'code'
                error!("Recurso no encontrado",:not_found)
            else
                @resolve = Competitor.where(my_poll_id:@poll.id).first
            end
        end
    end
end