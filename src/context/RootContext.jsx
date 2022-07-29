import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { rootReducer } from '../reducers/rootReducer';

const StateContext = createContext();
const DispatchContext = createContext();

export const useGlobalState = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);

const initialValue = {
  contactsState: {
    contacts: [],
    contact: null,
    isFetchingContacts: false,
  },
  meetingsState: {
    meetings: [],
    meeting: null,
    isFetchingMeetings: false,
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
