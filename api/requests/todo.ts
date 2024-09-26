import { Todo } from '../../types/todo';
import api from '../api';

export function getTodos(): Promise<Todo[]> {
    return api.get('v1/todo').json();
}
