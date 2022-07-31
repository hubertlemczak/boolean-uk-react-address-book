import ACTION_TYPES from '../action/actionTypes';

const meetingsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_MEETINGS:
      return {
        ...state,
        meetings: action.payload.meetings,
        isLoadingMeetings: false,
      };
    case ACTION_TYPES.ADD_MEETING:
      return {
        ...state,
        meetings: [...state.meetings, action.payload.meeting],
      };
    case ACTION_TYPES.LOADING_MEETINGS:
      return {
        ...state,
        isLoadingMeetings: true,
      };
    default:
      return state;
  }
};

export default meetingsReducer;
