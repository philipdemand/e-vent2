import React from 'react'
import Attendance from './Attendance'

function AttendeesList({ event, onCancelRegistration }) {

    return(
        <div className="event">
          <h2>Registered Attendees:</h2>
          <ul>
            {event.attendances.map(attendance => <Attendance key={attendance.id} attendance={attendance} onCancelRegistration={onCancelRegistration} />)}
          </ul>
        </div>
    )
}

export default AttendeesList