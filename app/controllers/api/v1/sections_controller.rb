class Api::V1::SectionsController < Api::V1::MasterApiController
    before_action :auth, only: [:create,:update, :destroy]
    before_action :set_poll
    before_action :set_section, only: [:update, :destroy]

    def index
        @sections = @poll.sections.rank
    end

    def create
        if @poll.user == @current_user
            if @resolve.blank? && @poll.status == 0
                @section = @poll.sections.new(sections_params)
                if @section.save
                     render template: "api/v1/sections/show"
                else
                    error_array!(@section.errors,:unprocessable_entity)
                end
            else
                if @poll.status != 0
                    error!("La encuesta no esta en edición, no puede agregar una nueva sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
                else
                    error!("La encuesta ha sido contestada, no puede agregar una nueva sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end                
            end
        else
            error!("No tienes autorizado agregar secciones a esta encuesta",:unauthorized)
        end
    end

    def update
        if @poll.user == @current_user
            if (@resolve.blank? && @poll.status == 0)  || params[:option] == 'rank'
                if @section.update(sections_params)
                    render template: "api/v1/sections/show"
                else
                    error_array!(@section.errors,:unprocessable_entity)
                end
            else
                if @poll.status != 0
                    error!("La encuesta no esta en edición, no puede actualizar esta sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
                else
                    error!("La encuesta ha sido contestada, no puede actualizar esta sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
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
                    if @section.destroy
                        head :ok
                    else
                        error_array!(@section.errors,:unprocessable_entity)
                    end
                else
                    error!("La encuesta no esta en edición, no puede eliminar esta sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
                end
            else
                error!("La encuesta ha sido contestada, no puede eliminar esta sección, Verifique las restricciones de la encuesta",:unprocessable_entity)
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
        @section = Section.find_by_id(params[:id])
        if @section.blank?
            error!("Recurso no encontrado",:not_found)
        end
    end

    def sections_params
        if params[:option] == 'rank'
            params.require(:section).permit(:rank,:option)
        else
            params.require(:section).permit(:name,:rank,:option)
        end
    end
end