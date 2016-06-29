class CreateQuestions < ActiveRecord::Migration
    def change
        create_table :questions do |t|
            t.references :section, index: true
            t.string :description
            t.integer :category
            #0->respuesta parrafo, 1->seleccion
            t.integer :rank
        end
    end
end
