import React, { Component } from 'react'
import './EventForm.scss'
import { Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { connect } from 'react-redux'
import { 
  saveEvent, 
  updateTextfieldValue, 
  updateDateValue, 
  updateFieldError,
  resetForm
} from '../store/actions'
import Spinner from '../Spinner/Spinner'
import Info from '../Info/Info'
import propTypes from 'prop-types'

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
    this.props.updateDateValue(date)
  }

  handleBlur = e => {
    const name = e.target.name
    const value = e.target.value
    this.validateField(name, value)
  }

  handleInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.props.updateTextfieldValue(name, value)
  }
  
  handleSubmit = e => {
    e.preventDefault()
    if( this.validateAllFields() ) { 
      const eventData = {
        firstName: this.props.firstName.value,
        lastName: this.props.lastName.value,
        email: this.props.email.value,
        eventDate: this.props.eventDate.value,
      }
      this.props.saveEvent(eventData)
    }
  }
  
  validateField = (fieldName, fieldValue = '') => {
    const validationRules = this.config[fieldName].validationRules

    let error = false
    let msg = ''

    if ( validationRules.email && !this.emailIsValid(fieldValue)) {
      error = true
      msg = 'Email is incorrect.'
    }

    if( validationRules.required && fieldValue === '' ) {
      error = true
      msg = 'This field is required.'
    }

    this.props.updateFieldError(fieldName, error, msg)
    
    return !error
  }

  validateAllFields = () => {
    let pass = true
    for( let fieldName in this.config) {
      if( !this.validateField(fieldName, this.props[fieldName].value) ) {
        pass = false
      }
    }
    return pass
  }

  emailIsValid = email => /\S+@\S+\.\S+/.test(email)

  render() {
    const textFields = []
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
    const errorMessage = this.props.error ? (
      <Info type="error">Something went wrong, please, try again later.</Info>
    ) : null
    return (
      !this.props.loaded ?
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
                error={this.props.eventDate.error}
                helperText={this.props.eventDate.msg}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="EventForm__footer">
            {errorMessage}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {this.props.loading ? <Spinner /> : null}
          </div>
        </form>
        : 
        <>
          <Info type="success">
            Thank You! You have been added to the guest list.
          </Info>
          <Button type="submit" color="primary" onClick={this.props.resetForm}>Back</Button>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)

EventForm.propTypes = {
  updateDateValue: propTypes.func,
  updateTextfieldValue: propTypes.func,
  saveEvent: propTypes.func,
  updateFieldError: propTypes.func,
  resetForm: propTypes.func,
  firstName: propTypes.object,
  lastName: propTypes.object,
  email: propTypes.object,
  eventDate: propTypes.object,
  error: propTypes.bool,
  loaded: propTypes.bool,
  loading: propTypes.bool,
}