class AddDetailsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :address, :string
    add_column :events, :date, :date
    add_column :events, :time, :time
    add_column :events, :details, :text
  end
end
