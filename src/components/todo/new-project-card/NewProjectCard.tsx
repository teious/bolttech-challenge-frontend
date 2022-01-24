import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import { useState, ChangeEvent } from "react"

export const NewProjectCard = ({ onAddProject }: { onAddProject: (name: string) => void }) => {
    const [name, setName] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    const handleSubmit = () => onAddProject(name)

    return <Grid item>
        <Card sx={{ maxWidth: 300 }}>
            <CardHeader sx={{ alignItems: 'center' }} title="Create a new project" />
            <CardContent>
                <TextField fullWidth label="Project name" value={name} onChange={handleChange} />

            </CardContent>
            <CardActions>
                <Button variant="contained" disableElevation fullWidth onClick={handleSubmit}>Create project</Button>

            </CardActions>

        </Card>
    </Grid >
}