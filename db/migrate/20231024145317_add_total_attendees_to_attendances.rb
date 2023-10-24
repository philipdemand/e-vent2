class AddTotalAttendeesToAttendances < ActiveRecord::Migration[6.1]
  def change
    add_column :attendances, :total_attendees, :integer
  end
end
