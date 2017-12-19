import { GET_CLIENT_LIST } from '../actions/types';
let initialState = { clientList: [] };

export default function (state = initialState, action) {

console.log("LIST REDUCER", action.payload);

  switch (action.type) {
    case GET_CLIENT_LIST:
    return { ...state, clientList: action.payload };
    default:
    return state;
  }

};
