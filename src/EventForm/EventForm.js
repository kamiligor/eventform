import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from '../axios-events';

class EventForm extends Component {
  state = {
    firstName: { value: ''},
    lastName: { value: ''},
    email: {value: ''},
    eventDate: {
      value: new Date(),
    }
  }

  config = {
    firstName: {
      label: 'First name',
      validationRules: {
        required: true,
      }
    },
    lastName: {
      label: 'Last name',
      validationRules: {
        required: true,
      }
    },
    email: {
      label: 'Email',
      validationRules: {
        required: true,
        email: true,
      }
    }
  }

  handleEventDate = date => {
    this.setState({
      eventDate: date
    })
  }

  handleBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.validateField(name, value);
  }

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
  
    // implicitly clear all other state properties (showError, msg, error)
    const field = { value }
    this.setState({[name]: field})
  }
  
  saveEvent = (eventData) => {
    //submit form
    //todo:loading icon 
    console.log('Loading...');
    axios.post('/create', eventData)
      .then(response => {
        console.log('response',response);
        //todo:hide loading icon
        //tood:show thankyou message
      } )
      .catch(error => {
        console.log('error',error);
        //todo:show error
      });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    
    if( this.validateAllFields() ) { 
      const eventData = {
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        email: this.state.email.value,
        eventDate: this.state.eventDate.value,
      }
      this.saveEvent(eventData);
    }
  }
  
  validateField = (fieldName, fieldValue = '') => {
    const validationRules = this.config[fieldName].validationRules;

    const err  = {
      error: false,
      msg: '',
    }

    if ( validationRules.email && !this.emailIsValid(fieldValue)) {
      err.error = true;
      err.msg = 'Email is incorrect.';
    }

    if( validationRules.required && fieldValue === '' ) {
      err.error = true;
      err.msg = 'This field is required.';
    }

    this.setState(prevState => {
      const field = {...prevState[fieldName]};
      field.error = err.error;
      field.msg = err.msg;
        
      return { [fieldName]: field }
    });

    return !err.error;
  }

  validateAllFields = () => {
    let pass = true
    for( let fieldName in this.config) {
      if( !this.validateField(fieldName, this.state[fieldName].value) ) {
        pass = false
      }
    }
    return pass;
  }

  emailIsValid = email => /\S+@\S+\.\S+/.test(email);

  render() {
    const textFields = [];
    for( let fieldName in this.config) {
      textFields.push(
        <TextField
          key={fieldName}
          name={fieldName}
          value={this.state[fieldName].value}
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          error={this.state[fieldName].error}
          helperText={this.state[fieldName].msg}
          id={fieldName}
          label={this.config[fieldName].label}
          variant="outlined"
        />
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form__main">
          {textFields}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              disablePast
              autoOk
              name="eventDate"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              id="date-picker-inline"
              label="Event date"
              value={this.state.eventDate.value}
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