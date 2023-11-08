class Attendance < ApplicationRecord
    belongs_to :user
    belongs_to :event
    validates :total_attendees, presence: true
    validates :total_attendees, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }
end
