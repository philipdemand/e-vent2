import React, { useState } from 'react';

const Event = ({ event }) => {
  const [registered, setRegistered] = useState(false);
  const [attendees, setAttendees] = useState(1);
  const [editingAttendees, setEditingAttendees] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
  };

  const handleEditAttendees = () => {
    setEditingAttendees(true);
  };

  const handleSubmitAttendees = () => {
    setEditingAttendees(false);
    // Add logic to update the number of attendees in your backend
    console.log(`Updated attendees to: ${attendees}`);
  };

  const handleCancelRegistration = () => {
    setRegistered(false);
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
      {registered ? (
        <div>
          <h4>You are registered for this event with {attendees} attendees</h4>
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
          <label>Total Number of Attendees:</label>
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