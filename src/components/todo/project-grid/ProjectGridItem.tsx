import { ChangeEvent, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, Grid, Icon, IconButton, TextField } from "@mui/material"
import { TodoList } from "../todo-list/TodoList"
import { Project } from '../../../types'
import { AddTodoPayload, EditProjectPayload, TodoActionPayload } from '../../../contexts/TodoContext'
import { NewTodoInput } from '../new-todo-input/NewTodoInput'
import { EditDialog } from '../edit-dialog/EditDialog'

interface ProjectGridItemProps {
    project: Project,
    onAddTodo: (payload: AddTodoPayload) => void
    onFinishTodo: (payload: TodoActionPayload) => void
    onDeleteTodo: (payload: TodoActionPayload) => void
    onEditProject: (payload: EditProjectPayload) => void
    onDeleteProject: (payload: string) => void

}
export function ProjectGridItem({ project, onAddTodo, onFinishTodo, onDeleteTodo, onEditProject, onDeleteProject }: ProjectGridItemProps) {
    const [editing, setEditing] = useState(false)

    const handleAddTodo = (description: string) => {
        onAddTodo({
            projectId: project._id,
            description
        })
    }

    const handleFinishTodo = (todoId: string) => {
        onFinishTodo({
            projectId: project._id,
            todoId
        })
    }

    const handleDeleteTodo = (todoId: string) => {
        onDeleteTodo({
            projectId: project._id,
            todoId
        })
    }

    const handleEditClose = (newProjectName?: string) => {
        setEditing(false)
        if (newProjectName) {
            onEditProject({
                projectId: project._id,
                newName: newProjectName
            })
        }
    }

    const handleDeleteProject = () => {
        onDeleteProject(project._id)
    }

    const handleEdit = () => setEditing(true)

    return <Grid item>
        <EditDialog open={editing} currentName={project.name} onClose={handleEditClose} />
        <Card sx={{ maxWidth: 345, minWidth: 300 }}>
            <CardHeader
                action={<>
                    <IconButton aria-label="settings" onClick={handleEdit}>
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton aria-label="settings" onClick={handleDeleteProject}>
                        <Icon>delete</Icon>
                    </IconButton>
                </>
                }
                title={project.name}
            />
            <CardContent>
                <TodoList todos={project.todos} onFinish={handleFinishTodo} onDelete={handleDeleteTodo} />
            </CardContent>
            <CardActions sx={{ alignItems: 'flex-end', gap: '16px' }}>
                <NewTodoInput onAddTodo={handleAddTodo} />
            </CardActions>
        </Card>
    </Grid>
}