class GameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :score, :victory

  belongs_to :user
end
