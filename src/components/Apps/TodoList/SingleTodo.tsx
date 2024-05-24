import React, { useEffect, useRef, useState } from 'react';
import { MdEdit, MdDelete, MdCodeOff, MdEditOff } from 'react-icons/md';
import { FaCheck, FaUndo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { localStoreTodos, setTodos } from './store/todoListSlice';
import { Todo } from './utils/model';
import { formatDate } from '../../../utilities/Timer';
import Swal from 'sweetalert2';

interface Props {
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useSelector((state: RootState) => state.todoList.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    edit && inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    let newTodos = todos.map((item) => (item.id === id ? {
      ...item,
      isDone: !item.isDone,
      id: Date.now()
    } : item))

    dispatch(setTodos(newTodos));

    dispatch(localStoreTodos(newTodos))
  };

  const onHandleEdit = () => {
    setEdit(!edit);

    setEditTodo(todo.todo);

  }

  const handleProtect = () => {
    Swal.fire({
      title: "Protect this todo?",
      icon: "warning",
      text: 'This will prevent the todo from deletion unless mark as done!',
      showCancelButton: true,
      confirmButtonColor: "#EF7C56",
      confirmButtonText: "Protect"
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedTodos = todos.map((item) => (item.id === todo.id ? {
          ...item,
          isProtected: true,
          id: Date.now()
        } : item))

        dispatch(setTodos(updatedTodos));
        dispatch(localStoreTodos(updatedTodos));
      }
    });


  }

  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault();

    let updatedTodos = todos.map((item) => (item.id === id ? {
      ...item,
      todo: editTodo,
      id: Date.now()
    } : item))

    dispatch(setTodos(updatedTodos));
    dispatch(localStoreTodos(updatedTodos));
    setEdit(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF5733",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedTodos = todos.filter((item) => item.id !== todo.id)

        dispatch(setTodos(updatedTodos));
        dispatch(localStoreTodos(updatedTodos))
      }
    });
  };

  return (
    <form
      className="flex flex-col border rounded-lg p-5 mt-4 bg-gray-200 hover:shadow-lg hover:scale-105 transition duration-300"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      <div className="flex-1 p-2">
        {edit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-cyan-950"
            ref={inputRef}
          />
        ) : todo.isDone ? (
            <s className="text-gray-600 line-through">{todo.todo}</s>
        ) : (
              <span className="text-gray-900">{todo.todo}</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span
          className="text-green-500 cursor-pointer transform hover:scale-110 transition duration-300"
          onClick={() => handleDone(todo.id)}
          title={todo.isDone ? 'Undo' : 'Mark as done'}
        >
          {todo.isDone ? <FaUndo size={24} /> : <FaCheck size={24} />}
        </span>

        <span
          className={`cursor-pointer transform transition duration-300 ${todo.isDone ? 'text-blue-300' : 'text-blue-500 hover:scale-110'}`}
          onClick={!todo.isDone ? () => onHandleEdit() : undefined}
          title={todo.isDone ? 'Todo marked as done' : 'Edit todo'}
        >
          <MdEdit size={24} />
        </span>

        <span
          className={`cursor-pointer transform transition duration-300 ${todo.isProtected ? 'text-red-300' : 'text-red-500 hover:scale-110'}`}
          onClick={!todo.isProtected ? () => handleProtect() : undefined}
          title={todo.isProtected ? 'This task is isProtected' : 'Protect this task'}
        >
          <MdEditOff size={24} />
        </span>

        <span
          className={`cursor-pointer transform transition duration-300 ${(todo.isProtected && !todo.isDone) ? 'text-red-300' : 'text-red-500 hover:scale-110'}`}
          onClick={(todo.isProtected && !todo.isDone) ? undefined : () => handleDelete()}
          title={(todo.isProtected && !todo.isDone) ? 'This task cannot be deleted' : 'Delete this task'}
        >
          <MdDelete size={24} />
        </span>
      </div>

      <div className="flex justify-end italic text-xs pt-2 text-gray-500">{formatDate(todo.id)}</div>
    </form>
  );
};

export default SingleTodo;
