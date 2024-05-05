import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoListState } from "../utils/model";

const initialState: TodoListState = {
	todos: [],
	todo: null
}

const todoListSlice = createSlice({
	name: 'todoList',
	initialState,
	reducers: {
		addTodoToTodoList: (state, action: PayloadAction<Todo>) => {
			state.todos = [...state.todos, action.payload]
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		setTodos: (state, action: PayloadAction<Todo[]>) => {
			state.todos = action.payload;
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		setCurrentTodo: (state, action: PayloadAction<string>) => {
			if (!action.payload) {
				state.todo = null;
			}

			state.todo = {
				id: Date.now(),
				todo: action.payload,
				isDone: false,
			};
		},
	},
});


export const {
	addTodoToTodoList,
	setCurrentTodo,
	setTodos

} = todoListSlice.actions;

export default todoListSlice.reducer;