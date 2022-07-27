import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ContactsContextProvider } from './context/ContactsContext';
import { MeetingsContextProvider } from './context/MeetingsContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <ContactsContextProvider>
        <MeetingsContextProvider>
          <App />
        </MeetingsContextProvider>
      </ContactsContextProvider>
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
