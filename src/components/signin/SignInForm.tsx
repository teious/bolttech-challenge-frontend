import { Avatar, Button, Icon, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link as RouterLink } from 'react-router-dom'

interface SignInFormProps {
    onSubmit: (payload: any) => void
}
export function SignInForm({ onSubmit }: SignInFormProps) {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(data.entries())
        onSubmit(payload)
    }


    return <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Icon>lock-outlined</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
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

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
            </Link>
        </Box>
    </>

}