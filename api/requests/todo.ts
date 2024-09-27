import { Todo } from '../../types/todo';
import api from '../api';

export function getTodos() {
    return api.get('v1/todo').json<Todo[]>();
}

export function addTodo(title: string, description: string) {
    return api.post('v1/todo', {
        json: { title, description },
    }).json<Todo>();
}
