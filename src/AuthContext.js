// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create an AuthContext with default values
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state to manage authentication

    // Simulated login function
    const signIn = (username) => {
        // Mock authentication logic
        setUser({ name: username });
    };

    // Logout function
    const signOut = () => {
        setUser(null);
    };

    // Check if user is logged in
    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
