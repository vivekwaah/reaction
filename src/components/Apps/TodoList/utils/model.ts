export interface TodoListState {
	todos: Todo[];
	todo: Todo | null;
}

export interface Todo {
	id: number,
	todo: string,
	isDone: boolean
}