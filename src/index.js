import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ContactsContextProvider } from './context/ContactsContext';
import { MeetingsContextProvider } from './context/MeetingsContext';
import { RootContextProvider } from './context/RootContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <RootContextProvider>
        <ContactsContextProvider>
          <MeetingsContextProvider>
            <App />
          </MeetingsContextProvider>
        </ContactsContextProvider>
      </RootContextProvider>
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
