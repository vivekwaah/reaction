import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/Apps/Counter/store/counterSlice";
import todoListReducer from "../components/Apps/TodoList/store/todoListSlice";
import authReducer from "../components/Apps/Auth/store/authSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		todoList: todoListReducer,
		authenticate: authReducer
	}
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
