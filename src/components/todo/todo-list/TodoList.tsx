import { List, Typography } from "@mui/material"
import { Todo } from "../../../types";
import { TodoListItem } from "./TodoListItem"

interface TodoListProps {
    todos: Todo[]
    onFinish: (todoId: string) => void,
    onDelete: (todoId: string) => void
}
export const TodoList = ({ todos, onFinish, onDelete }: TodoListProps) => {
    const todoTasks = todos.filter(todo => !todo.done);
    const doneTasks = todos.filter(todo => todo.done);

    const handleFinish = (todoId: string) => {
        onFinish(todoId)
    }

    const handleDelete = (todoId: string) => {
        onDelete(todoId)
    }
    return <>
        <Typography variant="h6">
            To Do
        </Typography>
        <List>
            {todoTasks.map((todo) => <TodoListItem key={todo._id} todo={todo} onFinish={handleFinish} onDelete={handleDelete} />)}
        </List>
        <Typography variant="h6">
            Done
        </Typography>
        <List>
            {doneTasks.map((todo) => <TodoListItem key={todo._id} todo={todo} />)}
        </List>
    </>

}