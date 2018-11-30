import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './Components/App';
import store from './store';

const root = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
