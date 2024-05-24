export interface TodoListState {
	todos: Todo[];
	todo: Todo | null;
	checkedTodoIds: number[];
}

export interface Todo {
	id: number,
	todo: string,
	isDone: boolean,
	isProtected?: boolean,
}