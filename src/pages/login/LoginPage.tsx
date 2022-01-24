import { Box, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../../components/signin/SignInForm';
import { AuthPayload, useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
    const { signin } = useAuth()
    const navigate = useNavigate()

    async function handleLogin(payload: AuthPayload) {
        await signin(payload)

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

            <SignInForm onSubmit={handleLogin} />

        </Box>
    </Container>

    );
};

