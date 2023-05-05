import React from 'react';
// import reactDOM from 'react-dom';
// (does the same thing as the line below, but doesn't destructure for the function)
// import { createRoot } from 'react-dom/client';
import { store } from './store.jsx';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'


import App from './components/App';


// ReactDOM.createRoot(document.getElementById)('root')).render(<App />);
// Above is for the non-destructured way on line 2
// Below is the way to do it for the method on line 4
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)