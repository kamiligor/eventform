import * as actionTypes from './actionTypes'

const initialState = {
  firstName: { value: '' },
  lastName: { value: '' },
  email: { value: '' },
  eventDate: { value: new Date() },
  loading: false,
  loaded: false,
  error: false,
}

const saveEventStart = state => {
  return { 
    ...state, 
    loading: true,
    error: false,
  }
}

const saveEventSuccess = state => {
  return {
    ...state, 
    loading: false,
    loaded: true,
    error: false,
  }
}

const saveEventFail = state => {
  return { 
    ...state, 
    loading: false,
    error: true,
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
    },
    loading: false
  }
}

const resetForm = () => {
  return initialState
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_EVENT_START: return saveEventStart(state)
    case actionTypes.SAVE_EVENT_SUCCESS: return saveEventSuccess(state)
    case actionTypes.SAVE_EVENT_FAIL: return saveEventFail(state)
    case actionTypes.UPDATE_TEXTFIELD_VALUE: return updateTextfieldValue(state, action)
    case actionTypes.UPDATE_DATE_VALUE: return updateDateValue(state, action)
    case actionTypes.UPDATE_FIELD_ERROR: return updateFieldError(state, action)
    case actionTypes.RESET_FORM: return resetForm()

    default: return state
  }
}

export default reducer