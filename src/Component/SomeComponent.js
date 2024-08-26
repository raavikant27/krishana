import React from 'react';
import { useAuth } from './AuthContext';

const SomeComponent = () => {
    const { user, signIn, signOut, isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated() ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <button onClick={signOut}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => signIn('UserName')}>Login</button>
                </div>
            )}
        </div>
    );
};

export default SomeComponent;
