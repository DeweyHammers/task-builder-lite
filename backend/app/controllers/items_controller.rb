class ItemsController < ApplicationController
  def create 
    item = Item.create(item_params)
    render json: item
  end

  def update
    item = Item.find_by(id: params[:id])
    item.update(complete: params[:complete])
  end

  def destroy
    item = Item.find_by(id: params[:id])
    item.destroy
  end

  def item_params
    params.require(:item).permit(:text, :complete, :task_id)
  end
end
