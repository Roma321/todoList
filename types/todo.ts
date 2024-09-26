import { TodoStatus } from './todoStatus';

export type Todo = {
    id: number,
    title: string,
    description: string,
    status: TodoStatus
}
