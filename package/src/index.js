// src/index.js

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import "./assets/scss/style.scss";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.js';
import store from "./store.js"
import reportWebVitals from './reportWebVitals.js';
import Loader from "./layouts/loader/Loader.js"

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>,
);

reportWebVitals();
