import React, { Suspense } from "react";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { createRoot } from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader.js";
import store from './store.js'; // Import your Redux store

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}> {/* Wrap your App with Provider and pass store as prop */}
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>,
);

reportWebVitals();
