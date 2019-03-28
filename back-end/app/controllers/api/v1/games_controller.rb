class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.create(game_params)
    if @game.valid?
      render json: @game, status: :created
    else
      render json: { errors: @game.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def game_params
      params.require(:api_v1_game).permit(:score, :victory, :user_id)
  end

end
