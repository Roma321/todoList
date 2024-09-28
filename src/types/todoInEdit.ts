import { Todo } from './todo';

export type TodoInEdit = Omit<Todo, 'id' | 'status'> & { id: number | null };

