import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'

const Event = ({ event, onAttendanceRegistered, onChangeTotalAttendees, onDeleteAttendance }) => {

  const [attendees, setAttendees] = useState(1);
  const [editingAttendees, setEditingAttendees] = useState(false);

  const {user} = useContext(UserContext)

  const isRegistered = event.attendances && event.attendances.length > 0
  ? event.attendances.some((attendance) => attendance.user_id === user.id)
  : false;

  const registeredAttendance = isRegistered
  ? event.attendances.find((attendance) => attendance.user_id === user.id)
  : null;

  const handleRegister = () => {
    const user_id = user.id
    const event_id = event.id;
    const postData = {
      user_id: user_id,
      event_id: event_id,
      total_attendees: parseInt(attendees)
    };
    fetch(`/events/${event_id}/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('Registration failed:', response.statusText);
        }
      })
      .then((newAttendance) => {
        onAttendanceRegistered(newAttendance);
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  const handleEditAttendees = () => {
    setEditingAttendees(true);
  };

  const handleSubmitAttendees = () => {
    setEditingAttendees(false);
    fetch(`/events/${event.id}/attendances/${registeredAttendance.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({total_attendees: parseInt(attendees)}),
    })
    .then((r) => r.json())
    .then(object => onChangeTotalAttendees(object))
  };

  const handleCancelRegistration = () => {
    fetch(`/events/${event.id}/attendances/${registeredAttendance.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDeleteAttendance(registeredAttendance.id)
        } else {
          console.error('Failed to cancel registration:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
    setAttendees(1);
  };

  const eventTime = new Date(event.time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const attendeesOptions = Array.from({ length: 10 }, (_, i) => (
    <option key={i} value={i + 1}>
      {i + 1}
    </option>
  ));
  
  return (
    <div className="event">
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {eventTime}</p>
      <p>Location: {event.address}</p>
      <p>Details: {event.details}</p>
      {isRegistered ? (
        <div>
          <h4>You are registered for this event with {registeredAttendance.total_attendees} attendees</h4>
          {editingAttendees ? (
            <div>
              <label>Total Number of Attendees:</label>
              <select value={attendees} onChange={(e) => setAttendees(e.target.value)}>
                {attendeesOptions}
              </select>
              <button onClick={handleSubmitAttendees}>Submit</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEditAttendees}>Change Number of Attendees</button> <br></br> <br></br>
              <button onClick={handleCancelRegistration}>Cancel Registration</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h4>Register for this event</h4>
          <label>Total Number of Attendees: </label>
          <select value={attendees} onChange={(e) => setAttendees(e.target.value)}>
            {attendeesOptions}
          </select>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Event;