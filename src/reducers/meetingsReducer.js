import ACTION_TYPES from '../action/actionTypes';

const meetingsReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_MEETINGS:
      return;
    default:
      return state;
  }
};

export default meetingsReducer;
