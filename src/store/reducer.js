import * as actionTypes from './actionTypes';

const initialState = {
  firstName: { value: '' },
  lastName: { value: '' },
  email: { value: '' },
  eventDate: { value: Date() },
  loading: false,
  loaded: false,
  error: '',
}

const saveEventStart = (state, action) => {
  return { 
    ...state, 
    loading: true
  }
}

const saveEventSuccess = (state, action) => {
  return {
    ...state, 
    loading: false,
    loaded: true,
  }
}

const saveEventFail = (state, action) => {
  return { 
    ...state, 
    loading: false,
    error: action.error
  }
}

const updateTextfieldValue = (state, action) => {
  return { 
    ...state, 
    [action.fieldName]: {
      value: action.fieldValue
    }
  }
}

const updateDateValue = (state, action) => {
  return { 
    ...state, 
    eventDate: {
      value: action.date
    }
  }
}

const updateFieldError = (state, action) => {
  return { 
    ...state, 
    [action.fieldName]: {
      ...state[action.fieldName],
      error: action.error,
      msg: action.msg
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_EVENT_START: return saveEventStart(state, action);
    case actionTypes.SAVE_EVENT_SUCCESS: return saveEventSuccess(state, action);
    case actionTypes.SAVE_EVENT_FAIL: return saveEventFail(state, action);
    case actionTypes.UPDATE_TEXTFIELD_VALUE: return updateTextfieldValue(state, action);
    case actionTypes.UPDATE_DATE_VALUE: return updateDateValue(state, action);
    case actionTypes.UPDATE_FIELD_ERROR: return updateFieldError(state, action);

    default:
      return state;
  }
}

export default reducer;