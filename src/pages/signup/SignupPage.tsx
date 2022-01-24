import { Box, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '../../components/signup/SignupForm';
import { useAuth } from '../../contexts/AuthContext';

export const SignupPage: React.FC = () => {
    const { signup } = useAuth()

    const navigate = useNavigate();

    async function handleSignup(payload: any) {

        const { username, password } = payload
        await signup({ username, password })

        navigate('/', { replace: true })


    }

    return (<Container component="main" maxWidth="xs">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8
            }}
        >

            <SignupForm onSubmit={handleSignup} />

        </Box>
    </Container>

    );
};

