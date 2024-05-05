import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/Apps/Counter/store/counterSlice";
import todoListReducer from "../components/Apps/TodoList/store/todoListSlice";


export const store = configureStore({
	reducer: {
		counter: counterReducer,
		todoList: todoListReducer
	}
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
