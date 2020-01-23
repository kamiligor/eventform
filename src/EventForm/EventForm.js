import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
        <div className="form__main">
          <TextField
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInput}
            id="firstName"
            label="First name"
            variant="outlined"
          />
          <TextField
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInput}
            id="lastName"
            label="Last name"
            variant="outlined"
          />
          <TextField
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            id="email"
            label="Email"
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              name="eventDate"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              id="date-picker-inline"
              label="Event date"
              value={this.state.eventDate}
              onChange={this.handleEventDate}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default EventForm;