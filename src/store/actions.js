import * as actionTypes from './actionTypes'
import axios from '../axios-events'

export const saveEventStart = () => {
  return {
    type: actionTypes.SAVE_EVENT_START
  }
}

export const saveEventSuccess = post => {
  return {
    type: actionTypes.SAVE_EVENT_SUCCESS,
    post,
  }
}

export const saveEventFail = () => {
  return {
    type: actionTypes.SAVE_EVENT_FAIL,
  }
}

export const saveEvent = eventData => {
  return dispatch => {
    dispatch(saveEventStart())
    return axios.post('/create', eventData)
      .then(res => {
        dispatch(saveEventSuccess(res.data))
      })
      .catch(error => {
        if(error.response) {
          const errors  = error.response.data.errors
          for( var err of errors) {
            let fieldName = err.param
            let msg = err.msg
            dispatch(updateFieldError(fieldName, true, msg))
          }
        } else {
          dispatch(saveEventFail())
        }
      })
  }
}

export const updateTextfieldValue = (fieldName, fieldValue) => {
  return {
    type: actionTypes.UPDATE_TEXTFIELD_VALUE,
    fieldName,
    fieldValue,
  }
}

export const updateDateValue = date => {
  return {
    type: actionTypes.UPDATE_DATE_VALUE,
    date,
  }
}

export const updateFieldError = (fieldName, error, msg) => {
  return {
    type: actionTypes.UPDATE_FIELD_ERROR,
    fieldName,
    error,
    msg,
  }
}

export const resetForm = () => {
  return {
    type: actionTypes.RESET_FORM,
  }
}
