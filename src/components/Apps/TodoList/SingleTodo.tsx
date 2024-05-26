import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { addTodoToCheckedList, localStoreTodos, setCheckedTodoIds, setTodos } from './store/todoListSlice';
import { Todo } from './utils/model';
import { formatDate } from '../../../utilities/Timer';
import TodoAction from './TodoAction';

interface Props {
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useSelector((state: RootState) => state.todoList.todos);
  const checkedTodoIds = useSelector((state: RootState) => state.todoList.checkedTodoIds);

  const dispatch = useDispatch();

  useEffect(() => {
    edit && inputRef.current?.focus();
  }, [edit]);

  const onHandleEdit = () => {
    setEdit(!edit);
    setEditTodo(todo.todo);
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

  const handleOnSelected = (event: React.BaseSyntheticEvent) => {
    if (event.target.checked) {
      dispatch(addTodoToCheckedList(todo.id));
    } else {
      let updatedCheckedTodoIds = checkedTodoIds.filter(id => id !== todo.id);
      dispatch(setCheckedTodoIds(updatedCheckedTodoIds));
    }
  }

  return (
    <form
      className="flex flex-col border rounded-lg px-5 pt-5 pb-1 mt-4 bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300 h-56"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      <div className="flex-1 overflow-auto">
        <div className="flex items-start mb-2">
          <input
            type="checkbox"
            checked={checkedTodoIds.includes(todo.id)}
            onChange={(e) => handleOnSelected(e)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
            aria-describedby="select todo"
            disabled={todo.isProtected}
            title={todo.isProtected ? 'Todo is protected' : 'Select todo'}
          />
          <div className="flex-1 pl-2 overflow-hidden">
            {edit ? (
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-gray-700"
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="text-gray-600 line-through">{todo.todo}</s>
            ) : (
              <span className="text-gray-900">{todo.todo}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <TodoAction todo={todo} onHandleEdit={onHandleEdit} />
        <div className="flex justify-end italic text-xs pt-2 text-gray-500">{formatDate(todo.id)}</div>
      </div>
    </form>
  );
};

export default SingleTodo;
