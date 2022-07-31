import { createContext, useContext, useReducer } from 'react';
import { rootReducer } from '../reducers/rootReducer';

const StateContext = createContext();
const DispatchContext = createContext();

export const useGlobalState = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);

const initialValue = {
  contactsState: {
    contacts: [],
    isFetchingContacts: false,
    contact: null,
    isFetchingContact: false,
  },
  meetingsState: {
    meetings: [],
    isFetchingMeetings: false,
    meeting: null,
    isFetchingMeeting: false,
  },
};

export const RootContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialValue);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
