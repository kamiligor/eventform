import * as actionTypes from './actionTypes';
import axios from '../axios-events';

const saveEventStart = () => {
    console.log('dispatching saveEventStart')
    return {
        type: actionTypes.SAVE_EVENT_START
    };
};
const saveEventSuccess = (post) => {
  return {
      type: actionTypes.SAVE_EVENT_SUCCESS,
      post,
  };
}
const saveEventFail = error => {
    return {
        type: actionTypes.SAVE_EVENT_FAIL,
        error,
    };
};

export const saveEvent = eventData => {
  console.log('saveEvent')
  return dispatch => {
    dispatch(saveEventStart());
    console.log('start')
    axios.post('/create', eventData)
    .then(res => {
      dispatch(saveEventSuccess(res.data));
      console.log('success')
    } )
    .catch(error => {
      dispatch(saveEventFail(error));
      console.log('error')
    });
  }
}

export const updateTextfieldValue = (fieldName, fieldValue) => {
    return {
        type: actionTypes.UPDATE_TEXTFIELD_VALUE,
        fieldName,
        fieldValue,
    };
};

export const updateDateValue = date => {
    return {
        type: actionTypes.UPDATE_DATE_VALUE,
        date,
    };
};

export const updateFieldError = (fieldName, error, msg) => {
    return {
        type: actionTypes.UPDATE_FIELD_ERROR,
        fieldName,
        error,
        msg,
    };
};