import { Todo } from '../../types/todo';
import { TodoStatus } from '../../types/todoStatus';
import api from '../api';

export function getTodos() {
    return api.get('v1/todo').json<Todo[]>();
}

export function addTodo(title: string, description: string) {
    return api.post('v1/todo', {
        json: { title, description },
    }).json<Todo>();
}

export function updateTodoStatus(id: number, status: TodoStatus) {
    return api.put(`v1/todo/status/${id}`, { json: { status } }).json<Todo>();
}

export function deleteTodo(id: number) {
    return api.delete(`v1/todo/${id}`).json<{
        'title': string,
        'description': string
    }>();
}

export function updateTodo(id: number, title: string, description: string) {
    return api.put(`v1/todo/${id}`, { json: { title, description } }).json<Todo>();
}
