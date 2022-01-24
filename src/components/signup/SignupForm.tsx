import { Avatar, Button, Icon, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link as RouterLink } from 'react-router-dom'

export function SignupForm({ onSubmit }: { onSubmit: (data: any) => void }) {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(data.entries())
        onSubmit(payload)
    }


    return <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Icon>lock-outlined</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign up
            </Button>
            <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign In
            </Link>
        </Box>
    </>

}