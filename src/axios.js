import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://unitive.up.railway.app',
});

export default instance;
