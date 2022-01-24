import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react";

interface EditDialogProps {
    onClose: (newName?: string) => void
    currentName: string
    open: boolean
}

export const EditDialog = (props: EditDialogProps) => {
    const { onClose, currentName, open } = props;
    const [newName, setNewName] = useState(currentName)

    const handleClose = () => onClose();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value)
    }

    const handleSubmit = () => onClose(newName);

    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit project</DialogTitle>
        <DialogContent sx={{ paddingTop: '16px !important' }}>
            <TextField
                value={newName}
                onChange={handleChange}
                label="Project name"
            />
        </DialogContent>
        <DialogActions>
            <Button
                onClick={handleSubmit}
                variant="contained"
            >Confirm</Button>
        </DialogActions>
    </Dialog>
}