// src/Component/SignUp.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path if necessary

function SignUp({ navigateToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = useAuth(); // Assuming you have a signUp function in your AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(name, email, password); // Call your signUp function
            navigate('/'); // Redirect to home after signup
        } catch (error) {
            console.error('Sign Up failed:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
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
                        Sign Up
                    </Button>
                </Box>
                <Button onClick={navigateToLogin} sx={{ mt: 2 }}>
                    Already have an account? Login
                </Button>
            </Box>
        </Container>
    );
}

export default SignUp;
