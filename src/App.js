import React from 'react';
import './App.css';
import EventForm from './EventForm/EventForm';

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <h1>Event Registration</h1>
        <EventForm />
      </main>
    </div>
  );
}

export default App;
