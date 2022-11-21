import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import I18NProvider from './components/I18NProvider';
import './index.css';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <I18NProvider>
        <App />
      </I18NProvider>
    </React.StrictMode>
  </Provider>
);
