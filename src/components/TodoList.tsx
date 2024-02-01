import React from 'react'
import Todo from "../utils/models";
import "./TodoList.css";
import SingleTodo from "./SingleTodo"


interface Props {
	todos: Todo[],
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return (
		<div className='todos'>
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