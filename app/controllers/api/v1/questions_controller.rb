class Api::V1::QuestionsController < Api::V1::MasterApiController
    before_action :auth, only: [:create,:update, :destroy]
    before_action :set_section
    before_action :set_poll
    before_action :set_question, only: [:update, :destroy]

    def index
        @questions = @section.questions.rank
    end

    def create
        if @poll.user == @current_user
            if @resolve.blank? && @poll.status == 0
                @question = @section.questions.new(questions_params)
                if @question.save
                    render template: "api/v1/questions/show"
                else
                    error_array!(@question.errors,:unprocessable_entity)
                end
            else
                if @poll.status != 0
                    error!("La encuesta no esta en edición, no puede agregar una nueva pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
                else
                    error!("La encuesta ha sido contestada, no puede agregar una nueva pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end  
            end
        else
            error!("No tienes autorizado agregar preguntas a esta sección",:unauthorized)
        end
    end

    def update
        if @poll.user == @current_user
            if (@resolve.blank? && @poll.status == 0)  || params[:option] == 'rank'
                if @question.update(questions_params)
                    render template: "api/v1/questions/show"
                else
                    error_array!(@question.errors,:unprocessable_entity)
                end
            else
                if @poll.status != 0
                    error!("La encuesta no esta en edición, no puede actualizar esta pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
                else
                    error!("La encuesta ha sido contestada, no puede actualizar esta pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end
            end
        else
            error!("No tienes autorizado actualizar este recurso",:unauthorized)
        end
    end

    def destroy
        if @poll.user == @current_user
            if @resolve.blank?
                if @poll.status == 0
                    if @question.destroy
                        head :ok
                    else
                        error_array!(@question.errors,:unprocessable_entity)
                    end
                else
                     error!("La encuesta no esta en edición, no puede eliminar esta pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end
            else
               error!("La encuesta ha sido contestada, no puede eliminar esta pregunta, Verifique las restricciones de la encuesta",:unprocessable_entity)
            end
        else
            error!("No tienes autorizado eliminar este recurso",:unauthorized)
        end
    end
#----------
    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:poll_id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        else
           @resolve = Competitor.where(my_poll_id:@poll.id).first 
        end
    end

    def set_section
        @section = Section.find_by_id(params[:section_id])
        if @section.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_question
        @question = Question.find_by_id(params[:id])
        if @question.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def questions_params
        if params[:option] == 'rank'
            params.require(:question).permit(:rank,:option)
        else
            params.require(:question).permit(:description,:rank,:category,:option)
        end
    end
end