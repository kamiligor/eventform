import React, { Component } from 'react'
import DatePicker from 'react-datepicker';

class EventForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: new Date(),
  }

  handleEventDate = date => {
    this.setState({
      eventDate: date
    })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form>
        <input 
          type="text"
          name="firstName"
          value={this.state.firstName} 
          placeholder="First name"
          onChange={this.handleInput}
        />
        <input 
          type="text" 
          name="lastName"
          value={this.state.lastName} 
          placeholder="Last name"
          onChange={this.handleInput}
        />
        <input 
          type="email" 
          name="email"
          value={this.state.email} 
          placeholder="Email"
          onChange={this.handleInput}
        />
        <DatePicker 
          selected={this.state.eventDate}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default EventForm;