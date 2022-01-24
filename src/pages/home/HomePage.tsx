import { Box, Container } from '@mui/material';
import React from 'react';
import { ProjectGrid } from '../../components/todo/project-grid/ProjectGrid';
import { TodoProvider } from '../../contexts/TodoContext';
export const HomePage: React.FC = () => {
    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8
                }}
            >

                <TodoProvider>
                    <ProjectGrid />
                </TodoProvider>
            </Box>

        </Container>
    );
};