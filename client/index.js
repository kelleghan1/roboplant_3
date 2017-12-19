import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import App from './components/App';
import Popup from 'react-popup';

// import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise';
// import reducers from './reducers/rootReducer';
import 'bootstrap-loader';
import './scss/main.scss';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<App/>, document.getElementById('app'));
