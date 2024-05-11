import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setTodos } from './store/todoListSlice';
import { Todo } from './utils/model';

const SearchField: React.FC = () => {
	const [search, setSearch] = useState('')

	const todos = useSelector((state: RootState) => state.todoList.todos);
	const dispatch = useDispatch();

	const searchTodos = (searchTerm: string) => {
		searchTerm = searchTerm.trim().toLowerCase();
		let filteredTodos: Todo[];

		if (searchTerm === '') {
			const storedTodos = localStorage.getItem('todos');
			filteredTodos = storedTodos ? JSON.parse(storedTodos) : [];
		} else {
			filteredTodos = todos.filter((todo) =>
				todo.todo.toLowerCase().includes(searchTerm)
			);
		}

		dispatch(setTodos(filteredTodos));
	};

	return (
		<>
			<input
				type="search"
				placeholder='Search your todos...'
				value={search}
				className='text-blue-950 p-2 mt-4 ml-4 w-1/2 rounded-md'
				onChange={(e) => {
					setSearch(e.target.value);
					searchTodos(e.target.value)
				}} />
		</>
	)
}

export default SearchField