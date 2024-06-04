import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { uiReducer } from './reducers/uiReducer'; // Named import
import App from './App/App';

// Redux store oluşturma
const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
