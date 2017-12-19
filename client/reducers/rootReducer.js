import { combineReducers } from 'redux';
import clientList from './clientListReducer';
// import submitClient from './submitClientReducer';

const rootReducer = combineReducers({
  clientList: clientList
  // submitClient: submitClient
});

export default rootReducer;
