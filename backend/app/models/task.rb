class Task < ApplicationRecord
  has_many :items

  def self.allTasksSerialized
    tasks = self.all
    tasksSerialized = {}
    tasks.each do |task|
      jsonItems = {} 
      task.items.each do |item|
        jsonItems[item.id] = {
          id: item.id,
          text: item.text,
          complete: item.complete
        }
      end
      jsonTask = {
        title: task.title, 
        description: task.description,
        items: jsonItems
      }
      tasksSerialized[task.id] = jsonTask
    end
    tasksSerialized
  end
end
