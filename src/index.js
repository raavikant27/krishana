// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);
