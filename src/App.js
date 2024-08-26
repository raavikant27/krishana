// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import JanmashtamiGreeting from './Component/JanmashtamiGreeting';
import Navbar from './Component/Navbar';  // Ensure you have Navbar component
import { AuthProvider, useAuth } from './AuthContext';

function AppContent() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={isAuthenticated ? <JanmashtamiGreeting /> : <Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
