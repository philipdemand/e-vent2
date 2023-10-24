class User < ApplicationRecord
    has_many :attendances
    has_many :events, through: :attendances
    validates :username, presence: true, uniqueness: true
    has_secure_password
end
