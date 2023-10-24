import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import Event from './components/Event';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {

  const [user, setUser] = useState(null);
  const [errorData, setErrorData] = useState([]);
  const [events, setEvents] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => setUser(data));
        navigate("/events");
      } else {
        setUser(null);
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddEvent = (object) => {
    console.log(object)
  }

  return (
    <>
    <Navbar setUser={setUser} user={user}/>
    {user ? (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventList events={events}/>} />
        <Route path="/events/create" element={<CreateEvent onAddEvent={handleAddEvent}/>} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/login" element={<LoginPage setErrorData={setErrorData} onLogin={setUser}/>} />
        <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    ) : (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage setErrorData={setErrorData} onLogin={setUser}/>} />
      <Route path="/signup" element={<SignUpPage onLogin={setUser}/>} />
    </Routes>
    )}
    </>
  );
};

export default App;