import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoListState } from "../utils/model";

const initialState: TodoListState = {
	todos: [],
	todo: null,
	checkedTodoIds: []
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
		},
		localStoreTodos: (state, action: PayloadAction<Todo[]>) => {
			localStorage.setItem('todos', JSON.stringify(action.payload))
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
		addTodoToCheckedList: (state, action: PayloadAction<number>) => {
			state.checkedTodoIds = [...state.checkedTodoIds, action.payload];
		},
		setCheckedTodoIds: (state, action: PayloadAction<number[]>) => {
			state.checkedTodoIds = action.payload;
		},
	},
});


export const {
	addTodoToTodoList,
	setCurrentTodo,
	localStoreTodos,
	setTodos,
	addTodoToCheckedList,
	setCheckedTodoIds

} = todoListSlice.actions;

export default todoListSlice.reducer;