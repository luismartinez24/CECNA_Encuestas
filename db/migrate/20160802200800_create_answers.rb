class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :question, index: true
      t.references :competitor, index: true
      t.string :comment
      t.integer :option
      t.timestamps null: false
    end
    add_foreign_key :answers, :questions
    add_foreign_key :answers, :competitors
  end
end
