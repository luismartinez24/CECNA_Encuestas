class CreateMyPolls < ActiveRecord::Migration
  def change
    create_table :my_polls do |t|
      t.references :user
      t.datetime :expires_at
      t.string :title
      t.text :description
      t.string :code
      t.string :color
      t.integer :status #0->en edicion, 1->activa, 2->cancelada, 3->desacticada
      t.timestamps null: false
    end
  end
end
