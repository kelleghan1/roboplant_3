import axios from 'axios';
import { GET_CLIENT_LIST } from '../types';

export default function (response) {
  return {type: GET_CLIENT_LIST, payload: response.data };
};
