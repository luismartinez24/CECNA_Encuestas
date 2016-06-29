class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
        t.references :my_poll, index: true
        t.string :name
        t.integer :rank
    end
  end
end
