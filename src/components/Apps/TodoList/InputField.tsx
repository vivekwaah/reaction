import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTodo, addTodoToTodoList } from "./store/todoListSlice";
import { RootState } from "../../../state/store";

const InputField: React.FC = () => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const todo = useSelector((state: RootState) => state.todoList.todo);

	const dispatch = useDispatch();

	const handleAddTodo = () => {
		if (todo) {
			dispatch(addTodoToTodoList(todo))
			dispatch(setCurrentTodo(''));
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			handleAddTodo();
			inputRef.current?.blur();
		}
	};

	return (
		<div>
			<form
				className="flex w-full items-center"
				onSubmit={() => {
					handleAddTodo();
					inputRef.current?.blur();
				}}
			>
				<textarea
					className="mx-4 w-full p-4 text-xl rounded-lg border-none transition duration-200 shadow-inner text-blue-950"
					placeholder="Add todo. (press ctrl+enter)"
					value={todo?.todo}
					onChange={(e) => {
						dispatch(setCurrentTodo(e.target.value));
					}}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				></textarea>

				<button
					className="pr-5 px-6 py-3 ml-2 bg-green-200 text-blue-950 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
					type="submit"
				>
					Add
				</button>
			</form>
		</div>
	);
};

export default InputField;
