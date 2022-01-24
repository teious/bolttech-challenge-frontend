import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
    const { user, signout } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => signout();


    return <AppBar position="relative">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TODO App
            </Typography>
            {user && <>
                <Button color="inherit" onClick={handleClick}>{user.username}</Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}

                >
                    <MenuItem onClick={handleSignout}>Sign out</MenuItem>
                </Menu>
            </>
            }
        </Toolbar>
    </AppBar>
}