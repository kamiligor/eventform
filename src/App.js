import React from 'react';
import './App.scss';
import EventForm from './EventForm/EventForm';

function App(props) {
  return (
    <div className="App">
      <main className="App__main">
        <h1>Event Registration</h1>
        <EventForm />
      </main>
    </div>
  );
}

export default App;
