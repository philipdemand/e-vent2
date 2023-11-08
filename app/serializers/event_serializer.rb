class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :date, :time, :details
  has_many :attendances
  has_many :users
end
