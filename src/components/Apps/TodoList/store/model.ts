import Todo from "../utils/model";

export interface TodoListState {
	todos: Todo[];
	todo: Todo | null;
}