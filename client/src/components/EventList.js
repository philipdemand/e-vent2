import React from 'react';
import Event from './Event'
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {

  return (
    <div>
      <Link to="/events/create">
          <button>Create Event</button>
      </Link>
      <h1>Events</h1>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;