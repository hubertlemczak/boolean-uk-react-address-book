import contactsReducer from './contactsReducer';
import meetingsReducer from './meetingsReducer';

const combineReducers = reducers => (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };

export const rootReducer = combineReducers({
  contactsState: contactsReducer,
  meetingsState: meetingsReducer,
});
