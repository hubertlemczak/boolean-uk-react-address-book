import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ContactsContextProvider } from './context/ContactsContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <ContactsContextProvider>
        <App />
      </ContactsContextProvider>
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
