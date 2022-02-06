import axios from 'axios';

const isProduction = process.env.REACT_APP_ENV === 'production';
const instance = axios.create({
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
  baseURL: isProduction
    ? process.env.REACT_APP_BASIC_SERVER_URL
    : 'http://localhost:3000',
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    instance.defaults.headers.common.authorization = token;
  } else {
    delete instance.defaults.headers.common.authorization;
  }
};

export default instance;
