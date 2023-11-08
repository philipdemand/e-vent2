class AttendanceSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :event_id, :total_attendees, :username
  belongs_to :event
  belongs_to :user

  def username
    object.user.username
  end

end
