class CreateCompetitors < ActiveRecord::Migration
  def change
    create_table :competitors do |t|
      t.references :my_poll, index: true
      t.timestamps null: false
    end
    add_foreign_key :competitors, :my_polls
  end
end
