import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
	},
	extraReducers: (builder) => {
		builder.
			addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
				state.value += action.payload;
			}).addCase(incrementAsync.pending, () => {
				console.log('Pending state!')
			})
	}
});

export const incrementAsync = createAsyncThunk(
	"counter/incrementAsync",
	async (amount: number) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return amount;
	}
)

export const {
	increment,
	decrement,
	incrementByValue,
	setUserIncrementValue
} = counterSlice.actions;

export default counterSlice.reducer;