import React from 'react';
import Event from './Event'
import { Link } from 'react-router-dom';

const EventList = ({ events, user, onAttendanceRegistered, onChangeTotalAttendees, onDeleteAttendance }) => {

  return (
    <div>
      <Link to="/events/create">
          <button className="createbutton">Create Event</button>
      </Link>
      <h1>Events</h1>
      {events.map((event) => (
        <Event 
          key={event.id} 
          event={event} 
          user={user} 
          onAttendanceRegistered={onAttendanceRegistered}
          onChangeTotalAttendees={onChangeTotalAttendees}
          onDeleteAttendance={onDeleteAttendance}
          />
      ))}
    </div>
  );
};

export default EventList;