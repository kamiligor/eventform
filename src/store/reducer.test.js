import reducer from './reducer.js';
import * as actionTypes from './actionTypes';

describe('reducer', () => {
  it('should handle SAVE_EVENT_START', () => {
    const action = { type: actionTypes.SAVE_EVENT_START };
    const state = { 
      loading: true 
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle SAVE_EVENT_SUCCESS', () => {
    const action = { type: actionTypes.SAVE_EVENT_SUCCESS };
    const state = { 
      loading: false,
      loaded: true
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle SAVE_EVENT_FAIL', () => {
    const action = { 
      type: actionTypes.SAVE_EVENT_FAIL,
      error: true,
    };
    const state = { 
      loading: false,
      error: true
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle UPDATE_TEXTFIELD_VALUE', () => {
    const action = { 
      type: actionTypes.UPDATE_TEXTFIELD_VALUE, 
      fieldName: 'firstName', 
      fieldValue: 'Jan' 
    };
    const state = { 
      firstName: {
        value: 'Jan'
      }
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle UPDATE_DATE_VALUE', () => {
    const action = { 
      type: actionTypes.UPDATE_DATE_VALUE,
      date: '22/01/2020' 
    };
    const state = { 
      eventDate: {
        value: '22/01/2020'
      } 
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle UPDATE_FIELD_ERROR', () => {
    const action = { 
      type: actionTypes.UPDATE_FIELD_ERROR,
      fieldName: 'firstName',
      error: true,
      msg: 'Error message.'
    };
    const state = { 
      firstName: {
        error: true,
        msg: 'Error message.'
      },
      loading: false
    };

    expect( reducer({}, action) ).toEqual( state );
  });

  it('should handle RESET FORM', () => {
    const action = { 
      type: actionTypes.RESET_FORM,
    };
    const defaultState = reducer(undefined, {});

    expect( reducer({}, action) ).toEqual( defaultState );
  });

});