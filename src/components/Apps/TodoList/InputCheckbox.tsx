import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setCheckedTodoIds } from './store/todoListSlice';

const InputCheckbox: React.FC = () => {
	const checkedTodoIds = useSelector((state: RootState) => state.todoList.checkedTodoIds);
	const todos = useSelector((state: RootState) => state.todoList.todos);

	const dispatch = useDispatch();

	const handleOnSelectAllTodos = () => {
		if (checkedTodoIds.length === todos.length) {
			dispatch(setCheckedTodoIds([]));
		} else {
			const allTodoIds = todos.map(todo => todo.id);
			dispatch(setCheckedTodoIds(allTodoIds));
		}
	}

	return (
		<div className="text-lg mt-8 ml-4 leading-6">
			<input
				type="checkbox"
				name='todos'
				checked={checkedTodoIds.length === todos.length}
				onChange={handleOnSelectAllTodos}
				className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"
				aria-describedby="select todo"
			/>
			<label
				htmlFor="todos"
				className="font-medium cursor-pointer"
				onClick={handleOnSelectAllTodos}
			>
				Selected: <span className="font-bold">{checkedTodoIds.length}</span>
			</label>
		</div>
	)
}

export default InputCheckbox;
