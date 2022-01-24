export interface Todo {
    _id: string;
    description: string;
    done: boolean;
    startDate: string;
    finishDate?: string;
}

export interface Project {
    _id: string;
    name: string;
    todos: Todo[]
}