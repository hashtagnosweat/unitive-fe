import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://38lshwfw-5001.asse.devtunnels.ms/',
});

export default instance;
