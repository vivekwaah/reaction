import { useState } from "react";
import InputField from "./InputField";
import Todo from "../../../utils/models";
import TodoList from "./TodoList";
import "./TodosApp.css";


const TodosApp: React.FC = () => {

	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([])

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
		<div className="todos-app">
			<div className="heading">TODOs</div>
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
};

export default TodosApp;
