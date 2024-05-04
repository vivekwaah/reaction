import React, { useEffect, useRef, useState } from 'react';
import Todo from '../Stopwatch/utils/models';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import moment from 'moment';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(todos.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)));
  };

  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    setTodos(todos.map((item) => (item.id === id ? { ...item, todo: editTodo } : item)));
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const formatDate = () => {
    return moment(todo.id).format('LLLL');
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            ref={inputRef}
          />
        ) : todo.isDone ? (
            <s className="text-gray-600 line-through">{todo.todo}</s>
        ) : (
              <span className="text-gray-900">{todo.todo}</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-green-500 cursor-pointer transform hover:scale-110 transition duration-300" onClick={() => handleDone(todo.id)}>
          <FaCheck size={24} />
        </span>
        <span className="text-blue-500 cursor-pointer transform hover:scale-110 transition duration-300" onClick={() => setEdit(!edit)}>
          <MdEdit size={24} />
        </span>
        <span className="text-red-500 cursor-pointer transform hover:scale-110 transition duration-300" onClick={() => handleDelete(todo.id)}>
          <MdDelete size={24} />
        </span>
      </div>

      <div className="flex justify-end italic text-xs pt-2 text-gray-500">{formatDate()}</div>
    </form>
  );
};

export default SingleTodo;
