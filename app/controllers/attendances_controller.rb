class AttendancesController < ApplicationController

    def create
        @event = Event.find(params[:event_id])
        @attendance = @event.attendances.new(attendance_params)
    
        if @attendance.save
          render json: @attendance, status: :created
        else
          render json: @attendance.errors, status: :unprocessable_entity
        end
    end

    def update
      @attendance = Attendance.find(params[:id])
    
      if @attendance.update(attendance_params) && session[:user_id] == @attendance.user_id
        render json: @attendance
      else
        render json: @attendance.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @attendance = Attendance.find(params[:id])
      if session[:user_id] == @attendance.user_id
        @attendance.destroy
        head :no_content
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
    
    private
    
    def attendance_params
      params.require(:attendance).permit(:user_id, :event_id, :total_attendees)
    end
      
end
