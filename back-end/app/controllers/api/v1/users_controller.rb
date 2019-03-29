class Api::V1::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.find_or_create_by(user_params)
    if @user.valid?
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def user_params
      params.require(:api_v1_user).permit(:username)
  end

end
