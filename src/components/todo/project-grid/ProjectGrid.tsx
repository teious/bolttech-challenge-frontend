import { CircularProgress, Grid } from "@mui/material"
import { useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { AddTodoPayload, EditProjectPayload, TodoActionPayload, useTodo } from "../../../contexts/TodoContext"
import { NewProjectCard } from "../new-project-card/NewProjectCard"
import { ProjectGridItem } from "./ProjectGridItem"

export const ProjectGrid = () => {
    const { user } = useAuth()
    const { projects, isLoading, fetchProjects, addTodo, finishTodo, deleteTodo, editProject, deleteProject, addProject } = useTodo()

    const handleAddTodo = (payload: AddTodoPayload) => {
        addTodo(payload).catch(console.error)
    }
    const handleFinishTodo = (payload: TodoActionPayload) => {
        finishTodo(payload).catch(console.error)
    }
    const handleDeleteTodo = (payload: TodoActionPayload) => {
        deleteTodo(payload).catch(console.error)
    }

    const handleEditProject = (payload: EditProjectPayload) => {
        editProject(payload).catch(console.error)
    }
    const handleDeleteProject = (projectId: string) => {
        deleteProject(projectId).catch(console.error)
    }

    const handleAddProject = (projectName: string) => {
        addProject(projectName).catch(console.error)
    }

    useEffect(() => {
        if (user) {
            fetchProjects().catch(console.error)
        }
    }, [user])
    if (isLoading) {
        return <CircularProgress />
    }
    return <Grid container spacing={2}>
        {projects.map(project => (
            <ProjectGridItem
                key={project._id}
                project={project}
                onAddTodo={handleAddTodo}
                onFinishTodo={handleFinishTodo}
                onDeleteTodo={handleDeleteTodo}
                onEditProject={handleEditProject}
                onDeleteProject={handleDeleteProject}
            />
        ))}
        <NewProjectCard onAddProject={handleAddProject} />
    </Grid>
}