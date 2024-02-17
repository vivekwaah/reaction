import React, { useEffect, useRef, useState } from 'react'
import Todo from '../../../utils/models'
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import './SingleTodo.css'

interface Props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  };

  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )

    setEdit(false);
  };

  const editTodoText = (id: number) => {
    if (!edit && !todo.isDone) {
      setEdit(!edit)
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => {
      return todo.id !== id
    }))
  };



  return (
    <form className='todos__single' onSubmit={(e) => { handleEdit(e, todo.id) }}>
      {edit ? (<input
        value={editTodo}
        onChange={(e) => { setEditTodo(e.target.value) }}
        className='todos__single--text' />) :
        todo.isDone ?
          (<s className="todos__single--text">
            {todo.todo}
          </s>) :
          (<span className="todos__single--text">
            {todo.todo}
          </span>)}

      <div className="flex">
        <span className="icon" onClick={() => { handleDone(todo.id) }}><FaCheck /></span>
        <span className="icon" onClick={() => { editTodoText(todo.id) }}><MdEdit /></span>
        <span className="icon" onClick={() => { handleDelete(todo.id) }}><MdDelete /></span>
      </div>
    </form>
  )
}

export default SingleTodo