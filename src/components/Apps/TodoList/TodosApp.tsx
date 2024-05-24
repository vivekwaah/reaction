import { useEffect } from 'react';
import InputField from './InputField';
import TodoList from './TodoList';
import { FiCheckCircle } from 'react-icons/fi';
import { setTodos } from './store/todoListSlice';
import { useDispatch } from 'react-redux';
import SearchField from './SearchField';
import InputCheckbox from './InputCheckbox';

const TodosApp: React.FC = () => {


	const dispatch = useDispatch();

	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		if (storedTodos) {
			dispatch(setTodos(JSON.parse(storedTodos)));
		}
	}, []);



	return (
		<div className="min-h-screen flex flex-col items-center bg-gradient-to-l from-blue-700 to-black font-neucha text-white rounded-lg">
			<div className="bg-white bg-opacity-30 p-8 shadow-lg w-full">
				<InputField />

				<SearchField />

				<InputCheckbox />

				<TodoList />
			</div>
			<div className="absolute bottom-8 left-8 text-3xl text-gray-200">
				<FiCheckCircle />
			</div>
		</div>
	);
};

export default TodosApp;
