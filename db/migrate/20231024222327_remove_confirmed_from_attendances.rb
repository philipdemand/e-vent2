class RemoveConfirmedFromAttendances < ActiveRecord::Migration[6.1]
  def change
    remove_column :attendances, :confirmed
  end
end
