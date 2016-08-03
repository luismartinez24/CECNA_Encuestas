class CreateQuestions < ActiveRecord::Migration
    def change
        create_table :questions do |t|
            t.references :section, index: true
            t.string :description
            t.integer :category
            #1->respuesta parrafo, 2->seleccion letras, 3->seleccion numero 1-5, 4->seleccion numero 1-10
            t.integer :rank
        end
        add_foreign_key :questions, :sections
    end
end
