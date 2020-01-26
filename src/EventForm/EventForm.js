import React, { Component } from 'react'
import './EventForm.scss';
import { Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { 
  saveEvent, 
  updateTextfieldValue, 
  updateDateValue, 
  updateFieldError,
  resetForm
} from '../store/actions';
import Spinner from '../Spinner/Spinner';
import Info from '../Info/Info';


class EventForm extends Component {

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
    this.props.updateDateValue(date);
  }

  handleBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.validateField(name, value);
  }

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.updateTextfieldValue(name, value);
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.firstName.value)
    if( this.validateAllFields() ) { 
      const eventData = {
        firstName: this.props.firstName.value,
        lastName: this.props.lastName.value,
        email: this.props.email.value,
        eventDate: this.props.eventDate.value,
      }
      this.props.saveEvent(eventData);
    }
  }
  
  validateField = (fieldName, fieldValue = '') => {
    const validationRules = this.config[fieldName].validationRules;

    let error = false;
    let msg = '';

    if ( validationRules.email && !this.emailIsValid(fieldValue)) {
      error = true;
      msg = 'Email is incorrect.';
    }

    if( validationRules.required && fieldValue === '' ) {
      error = true;
      msg = 'This field is required.';
    }

    this.props.updateFieldError(fieldName, error, msg);
    
    return !error;
  }

  validateAllFields = () => {
    let pass = true
    for( let fieldName in this.config) {
      if( !this.validateField(fieldName, this.props[fieldName].value) ) {
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
          value={this.props[fieldName].value}
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          error={this.props[fieldName].error}
          helperText={this.props[fieldName].msg}
          id={fieldName}
          label={this.config[fieldName].label}
          variant="outlined"
        />
      )
    }
    return (
      !this.props.loaded ? (
      <form onSubmit={this.handleSubmit} className="EventForm">
        <div className="EventForm__main">
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
              value={this.props.eventDate.value}
              onChange={this.handleEventDate}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="EventForm__footer">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {this.props.loading ? <Spinner /> : null}
        </div>
      </form>
      )
      :
      <Info>
        <p>Thank You! You have been attached to the guest list.</p>
        <Button type="submit" color="primary" onClick={this.props.resetForm}>Back</Button>
      </Info>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    eventDate: state.eventDate,
    error: state.error,
    loading: state.loading,
    loaded: state.loaded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvent: (eventData) => dispatch(saveEvent(eventData)),
    updateTextfieldValue: (fieldName, fieldValue) => dispatch(updateTextfieldValue(fieldName, fieldValue)),
    updateDateValue: (date) => dispatch(updateDateValue(date)),
    updateFieldError: (fieldName, error, msg) => dispatch(updateFieldError(fieldName, error, msg)),
    resetForm: () => dispatch(resetForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);