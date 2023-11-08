import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Attendance({ attendance, onCancelRegistration }) {

    const {username, user_id, id, total_attendees} = attendance

    const [isClicked, setIsClicked] = useState(false)

    const {user} = useContext(UserContext)

    const onEditAttendees = () => {

    }
    
    return (
        <div>
            <li>
                {username} with {total_attendees} {total_attendees === 1 ? "attendee" : "attendees"}
                {user.id === user_id ? <button onClick={() => onCancelRegistration(id)}>Cancel Registration</button> : null}
                {user.id === user_id ? 
                    <button onClick={() => onEditAttendees(id)}>Change Number of Attendees</button>
                : null}
            </li>
        </div>
    )
}

export default Attendance