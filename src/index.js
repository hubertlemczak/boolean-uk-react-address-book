import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RootContextProvider } from './context/RootContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <RootContextProvider>
        <App />
      </RootContextProvider>
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
