import React from 'react'
import SingleTodo from "./SingleTodo"
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';


const TodoList: React.FC = () => {
	const todos = useSelector((state: RootState) => state.todoList.todos);

	return (
		<div className='todos grid grid-cols-4 gap-4 px-4'>
			{todos.map((todo) => (
				<SingleTodo
					todo={todo}
					key={todo.id.toString()}
				/>
			))}
		</div>
	)
}

export default TodoList