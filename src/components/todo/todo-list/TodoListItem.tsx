import { Checkbox, Icon, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { Todo } from '../../../types'

interface TodoListItemProps {
    todo: Todo,
    onFinish?: (todoId: string) => void,
    onDelete?: (todoId: string) => void
}
export const TodoListItem = ({ todo, onFinish, onDelete }: TodoListItemProps) => {
    const handleFinish = () => {
        if (!todo.done && onFinish) {
            onFinish(todo._id)
        }
    }

    const handleDelete = () => {
        if (!todo.done && onDelete) {
            onDelete(todo._id)
        }
    }

    return <ListItem
        key={todo._id}
        secondaryAction={
            !todo.done && <IconButton size="small" edge="end" aria-label="comments" onClick={handleDelete}>
                <Icon fontSize="small">delete</Icon>
            </IconButton>
        }
        disablePadding
    >
        <Tooltip disableHoverListener={!todo.done} title={`Finish date: ${new Date(todo.finishDate as string).toLocaleString()}`} enterDelay={200} leaveDelay={200}>
            <ListItemButton role={undefined} onClick={handleFinish} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.done}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={todo.description} />
            </ListItemButton>
        </Tooltip>
    </ListItem>
}