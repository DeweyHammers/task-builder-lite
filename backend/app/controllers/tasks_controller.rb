class TasksController < ApplicationController
  def index 
    tasks = Task.allTasksSerialized
    render json: tasks
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
  end

  def task_params
    params.require(:task).permit(:title, :description)
  end
end
