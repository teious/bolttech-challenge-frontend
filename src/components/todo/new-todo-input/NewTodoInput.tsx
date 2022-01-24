import { Button, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"


export const NewTodoInput = ({ onAddTodo }: { onAddTodo: (description: string) => void }) => {
    const [description, setDescription] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleClick = () => onAddTodo(description)

    return <>
        <TextField
            sx={{ flex: 1 }}
            onChange={handleChange}
            id="standard-basic"
            label="Task description"
            variant="standard"
            value={description} />
        <Button onClick={handleClick} variant="contained" disableElevation>
            Add
        </Button>
    </>
}