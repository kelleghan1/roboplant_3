import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Popup from 'react-popup';

import 'bootstrap-loader';
import './scss/main.scss';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<App/>, document.getElementById('app'));
