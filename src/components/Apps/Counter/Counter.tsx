import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { decrement, increment, incrementAsync, incrementByValue, setUserIncrementValue } from './store/counterSlice';
import Heading from './Heading';

const Counter = () => {
	const count = useSelector((state: RootState) => state.counter.value);
	const userIncrementValue = useSelector((state: RootState) => state.counter.userIncrementValue);
	const dispatch = useDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setUserIncrementValue(parseInt(e.target.value)));
	};

	const handleIncrementByValue = () => {
		dispatch(incrementByValue(userIncrementValue));
	};

	const handleAsyncIncrementByValue = () => {
		dispatch(incrementAsync(userIncrementValue))
	};

	return (
		<>
			<Heading />
			<div className="flex flex-col items-center justify-center h-80 py-6 bg-gradient-to-br from-black to-purple-950 text-white">
				<div className="flex items-center justify-center">
					<span className="text-6xl font-bold mr-6">{count}</span>
					<div className="flex flex-col">
						<button
							className="px-6 py-3 bg-green-500 text-white rounded-lg mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
							onClick={() => dispatch(increment())}
						>
							Increment
						</button>
						<button
							className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
							onClick={() => dispatch(decrement())}
						>
							Decrement
						</button>
						<div className="flex items-center">
							<input
								type="number"
								min="1"
								placeholder="Enter value"
								value={userIncrementValue}
								onChange={handleInputChange}
								className="px-3 py-2 border border-gray-400 rounded-lg mr-2 focus:outline-none focus:border-purple-400 text-black"
							/>
							<button
								disabled={isNaN(userIncrementValue)}
								className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
								onClick={handleIncrementByValue}
							>
								Increment by {isNaN(userIncrementValue) ? '---' : userIncrementValue}
							</button>
							<button
								className="px-6 py-3 ml-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
								onClick={handleAsyncIncrementByValue}
							>
								Async Increment by {isNaN(userIncrementValue) ? '---' : userIncrementValue}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Counter;
