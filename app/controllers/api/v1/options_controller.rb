class Api::V1::OptionsController < Api::V1::MasterApiController
    before_action :auth, only: [:create]
    before_action :set_question
    before_action :set_section
    before_action :set_poll

    def index
        @options = @question.options
    end

    def create
        if @poll.user == @current_user
            @option = @question.options.new(options_params)
            if @option.save
                head :ok
            else
                error_array!(@option.errors.full_messages,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar opciones a esta pregunta",:unauthorized)
        end
    end

    private

    def set_question
        @question = Question.find_by_id(params[:question_id])
        if @question.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_section
        @section = Section.find_by_id(params[:section_id])
        if @section.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_poll
        @poll = MyPoll.find_by_id(params[:poll_id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def options_params
        params.require(:option).permit(:content,:rank)
    end
end