class Api::V1::QuestionsController < Api::V1::MasterApiController
    before_action :auth, only: [:create]
    before_action :set_section
    before_action :set_poll

    def index
        @questions = @section.questions
    end

    def create
        if @poll.user == @current_user
            @question = @section.questions.new(questions_params)
            if @question.save
                head :ok
            else
                error_array!(@question.errors,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar preguntas a esta sección",:unauthorized)
        end
    end

    private

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

    def questions_params
        params.require(:question).permit(:description,:rank,:category)
    end
end