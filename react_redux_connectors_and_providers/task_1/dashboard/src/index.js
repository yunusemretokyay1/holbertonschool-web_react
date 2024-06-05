import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { uiReducer } from './reducers/uiReducer';
import App from './App/App';

const store = createStore(uiReducer);

const rootId = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, rootId
);
