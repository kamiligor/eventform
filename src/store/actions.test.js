import * as actions from './actions';
import * as actionTypes from './actionTypes';

describe('actions', () => {
  it('should create an action to reset form', () => {
    const expectedAction = {
      type: actionTypes.RESET_FORM
    }
    expect(actions.resetForm()).toEqual(expectedAction)
  });

  it('should create an action to start saving event', () => {
    const expectedAction = {
      type: actionTypes.SAVE_EVENT_START
    }
    expect(actions.saveEventStart()).toEqual(expectedAction)
  });

  it('should create an action to handle successfully saved event', () => {
    const expectedAction = {
      type: actionTypes.SAVE_EVENT_SUCCESS
    }
    expect(actions.saveEventSuccess()).toEqual(expectedAction)
  });

  it('should create an action to handle failed saving event', () => {
    const expectedAction = {
      type: actionTypes.SAVE_EVENT_FAIL
    }
    expect(actions.saveEventFail()).toEqual(expectedAction)
  });

  it('should create an action to update textfield value', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_TEXTFIELD_VALUE,
    }
    expect(actions.updateTextfieldValue()).toEqual(expectedAction)
  });

  it('should create an action to update datepicker value', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_DATE_VALUE,
    }
    expect(actions.updateDateValue()).toEqual(expectedAction)
  });

  it('should create an action to check field errors ', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_FIELD_ERROR,
    }
    expect(actions.updateFieldError()).toEqual(expectedAction)
  });
});