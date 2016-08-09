class Api::V1::AnswersController < Api::V1::MasterApiController
    before_action :set_competitor
    before_action :set_question
    before_action :set_section
    before_action :set_poll


    def create
        @answer = @question.answers.new(answers_params)
        if @answer.save
            head :ok
        else
            error_array!(@answer.errors,:unprocessable_entity)
        end
    end

    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:poll_id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_section
        @section = Section.find_by_id(params[:section_id])
        if @section.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_question
        @question = Question.find_by_id(params[:question_id])
        if @question.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_competitor
        @competitor = Competitor.find_by_id(params[:answer][:competitor_id])
        if @competitor.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def answers_params
        params.require(:answer).permit(:competitor_id,:comment,:option)
    end
end