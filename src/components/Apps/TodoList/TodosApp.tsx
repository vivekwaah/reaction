import { useEffect, useState } from 'react';
import InputField from './InputField';
import Todo from '../Stopwatch/utils/models';
import TodoList from './TodoList';
import { FiCheckCircle } from 'react-icons/fi';

const TodosApp: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		if (!todos.length) {
			return;
		}

		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					todo: todo,
					isDone: false,
				},
			]);

			setTodo('');
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center bg-gradient-to-l from-blue-700 to-black font-neucha text-white">
			<div className="bg-white bg-opacity-30 rounded-lg p-8 shadow-lg">
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList todos={todos} setTodos={setTodos} />
			</div>
			<div className="absolute bottom-8 left-8 text-3xl text-gray-200">
				<FiCheckCircle />
			</div>
		</div>
	);
};

export default TodosApp;
