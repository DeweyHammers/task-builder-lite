class ItemsController < ApplicationController
  def update
    item = Item.find_by(id: params[:id])
    item.update(complete: params[:complete])
  end
end
