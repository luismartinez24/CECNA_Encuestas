class Api::V1::SectionsController < Api::V1::MasterApiController
    before_action :auth, only: [:create,:update, :destroy]
    before_action :set_poll
    before_action :set_section, only: [:update, :destroy]

    def index
        @sections = @poll.sections.rank
    end

    def create
        if @poll.user == @current_user
            @section = @poll.sections.new(sections_params)
            if @section.save
                 render template: "api/v1/sections/show"
            else
                error_array!(@section.errors,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar secciones a esta encuesta",:unauthorized)
        end
    end

    def update
        if @poll.user == @current_user
            if @section.update(sections_params)
                render template: "api/v1/sections/show"
            else
                error_array!(@section.errors,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar secciones a esta encuesta",:unauthorized)
        end
    end

    def destroy
        if @poll.user == @current_user
            if @section.destroy
                head :ok
            else
                error_array!(@section.errors,:unprocessable_entity)
            end
        else
            error!("No tienes autorizado agregar secciones a esta encuesta",:unauthorized)
        end
    end
#----------
    private

    def set_poll
        @poll = MyPoll.find_by_id(params[:poll_id])
        if @poll.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def set_section
        @section = Section.find_by_id(params[:id])
        if @section.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def sections_params
        params.require(:section).permit(:name,:rank)
    end
end