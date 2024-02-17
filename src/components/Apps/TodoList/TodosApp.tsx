import { useEffect, useState } from "react";
import InputField from "./InputField";
import Todo from "../../../utils/models";
import TodoList from "./TodoList";
import "./TodosApp.css";


const TodosApp: React.FC = () => {

	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		if (!todos.length) {
			return;
		}

		localStorage.setItem("todos", JSON.stringify(todos))
	}, [todos]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos([...todos, {
				id: Date.now(),
				todo: todo,
				isDone: false
			}]);

			setTodo('');
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center bg-blue-600 font-neucha">
			<div className="uppercase text-5xl mt-8 mb-8 text-white z-10 text-center">TODOs</div>
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
};

export default TodosApp;
