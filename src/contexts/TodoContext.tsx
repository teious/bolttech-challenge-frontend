import React, { useState } from "react";
import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:8000/projects`
});


interface TodoContextType {
    projects: any[],
    isLoading: boolean,
    fetchProjects: () => Promise<void>;
    addTodo: (payload: AddTodoPayload) => Promise<void>;
    addProject: (name: string) => Promise<void>;
    finishTodo: (payload: TodoActionPayload) => Promise<void>;
    deleteTodo: (payload: TodoActionPayload) => Promise<void>;
    editProject: (payload: EditProjectPayload) => Promise<void>
    deleteProject: (projectId: string) => Promise<void>

}
export interface AddTodoPayload {
    projectId: string;
    description: string;
}
export interface EditProjectPayload {
    projectId: string;
    newName: string;
}
export interface TodoActionPayload {
    projectId: string;
    todoId: string;
}
const TodoContext = React.createContext<TodoContextType>(null!);

const getAuthHeaders = () => {
    const bearerToken = sessionStorage.getItem('access_token');
    return {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)



    const fetchProjects = async () => {
        setIsLoading(true)
        const { data } = await API.get('/', getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }
    const addTodo = async ({ projectId, description }: AddTodoPayload) => {
        setIsLoading(true)
        const { data } = await API.post(`/${projectId}/todos`, { description }, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }

    const finishTodo = async ({ projectId, todoId }: TodoActionPayload) => {
        setIsLoading(true)
        const { data } = await API.put(`/${projectId}/todos/${todoId}/finish`, null, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }

    const deleteTodo = async ({ projectId, todoId }: TodoActionPayload) => {
        setIsLoading(true)
        const { data } = await API.delete(`/${projectId}/todos/${todoId}`, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }

    const editProject = async ({ projectId, newName }: EditProjectPayload) => {
        setIsLoading(true)
        const { data } = await API.put(`/`, {
            _id: projectId,
            name: newName
        }, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }

    const deleteProject = async (projectId: string) => {
        setIsLoading(true)
        const { data } = await API.delete(`/${projectId}`, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)
    }

    const addProject = async (name: string) => {
        setIsLoading(true)
        const { data } = await API.post(`/create`, { projectName: name }, getAuthHeaders())
        setProjects(data)
        setIsLoading(false)

    }

    const value = { projects, isLoading, fetchProjects, addProject, addTodo, finishTodo, deleteTodo, editProject, deleteProject }
    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
    return React.useContext(TodoContext);
}
