class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.text :text
      t.boolean :complete
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
