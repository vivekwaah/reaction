import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { localStoreTodos, setCheckedTodoIds, setTodos } from './store/todoListSlice';
import { MdDelete, MdEditOff } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const InputCheckbox: React.FC = () => {
	const checkedTodoIds = useSelector((state: RootState) => state.todoList.checkedTodoIds);
	const todos = useSelector((state: RootState) => state.todoList.todos);

	const dispatch = useDispatch();

	const handleOnSelectAllTodos = () => {
		if (checkedTodoIds.length === todos.filter(todo => !todo.isProtected).length) {
			dispatch(setCheckedTodoIds([]));
		} else {
			const allTodoIds = todos.filter(todo => !todo.isProtected).map(todo => todo.id);
			dispatch(setCheckedTodoIds(allTodoIds));
		}
	};

	const handleDoneToSelected = () => {
		Swal.fire({
			title: "Mark as done?",
			icon: "warning",
			text: 'This will mark all the selected todos as done!',
			showCancelButton: true,
			confirmButtonColor: "#10B981",
			cancelButtonColor: "#6B7280",
			confirmButtonText: "Done"
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedTodos = todos.map((item) => (
					checkedTodoIds.includes(item.id) ? { ...item, isDone: true } : item
				));
				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const handleDeleteToSelected = () => {
		Swal.fire({
			title: "Delete selected todos?",
			icon: "warning",
			text: 'This will delete all the selected todos!',
			showCancelButton: true,
			confirmButtonColor: "#EF4444",
			cancelButtonColor: "#6B7280",
			confirmButtonText: "Delete"
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedTodos = todos.filter((item) => !checkedTodoIds.includes(item.id));
				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const handleProtectToSelected = () => {
		Swal.fire({
			title: "Protect selected todos?",
			icon: "warning",
			text: 'This will protect all the selected todos!',
			showCancelButton: true,
			confirmButtonColor: "#F59E0B",
			cancelButtonColor: "#6B7280",
			confirmButtonText: "Protect"
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedTodos = todos.map((item) => (
					checkedTodoIds.includes(item.id) ? { ...item, isProtected: true } : item
				));
				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	return (
		<div className="text-lg mt-8 ml-4 leading-6 flex items-center space-x-4">
			<input
				type="checkbox"
				name="todos"
				checked={checkedTodoIds.length === todos.length}
				onChange={handleOnSelectAllTodos}
				className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
				aria-describedby="select todo"
			/>
			<label
				htmlFor="todos"
				className="font-medium cursor-pointer"
				title='Select non-protected todos'
				onClick={handleOnSelectAllTodos}
			>
				Selected: <span className="font-bold">{checkedTodoIds.length}</span>
			</label>
			{checkedTodoIds.length > 0 && (
				<>
					<button
						className="ml-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex items-center"
						onClick={handleDoneToSelected}
					>
						Done <FaCheck className="ml-2" size={20} />
					</button>
					<button
						className="ml-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 flex items-center"
						onClick={handleProtectToSelected}
					>
						Protect <MdEditOff className="ml-2" size={20} />
					</button>
					<button
						className="ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 flex items-center"
						onClick={handleDeleteToSelected}
					>
						Delete <MdDelete className="ml-2" size={20} />
					</button>
				</>
			)}
		</div>
	);
};

export default InputCheckbox;
