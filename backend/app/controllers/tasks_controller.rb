class TasksController < ApplicationController
  def index 
    tasks = Task.allTasksSerialized
    render json: tasks
  end
end
