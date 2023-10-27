class Event < ApplicationRecord
    has_many :attendances
    has_many :users, through: :attendances
    validates :title, presence: true, uniqueness: true
    validates :address, presence: true
end
