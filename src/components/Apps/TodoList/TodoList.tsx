import React from 'react'
import Todo from "../Stopwatch/utils/models";
import SingleTodo from "./SingleTodo"

interface Props {
	todos: Todo[],
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
	return (
		<div className='todos grid grid-cols-4 gap-4 px-4'>
			{todos.map((todo) => (
				<SingleTodo
					todo={todo}
					todos={todos}
					key={todo.id.toString()}
					setTodos={setTodos}
				/>
			))}
		</div>
	)
}

export default TodoList