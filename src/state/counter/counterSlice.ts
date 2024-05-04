import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
	value: number;
	userIncrementValue: number;
}

const initialState: CounterState = {
	value: 0,
	userIncrementValue: 100,
}

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByValue: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		setUserIncrementValue: (state, action: PayloadAction<number>) => {
			state.userIncrementValue = action.payload;
		},
	}
})

export const {
	increment,
	decrement,
	incrementByValue,
	setUserIncrementValue
} = counterSlice.actions;

export default counterSlice.reducer;