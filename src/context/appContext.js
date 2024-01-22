import React from 'react';
import { io } from 'socket.io-client';
const SOCKET_URL = 'https://38lshwfw-5001.asse.devtunnels.ms';

export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext();
