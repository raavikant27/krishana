// src/Component/Login.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path if necessary

function Login({ navigateToSignUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Assuming you have a login function in your AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Call your login function
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Box>
                <Button onClick={navigateToSignUp} sx={{ mt: 2 }}>
                    Don’t have an account? Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
