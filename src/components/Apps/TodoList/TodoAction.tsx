import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaUndo } from 'react-icons/fa'
import { MdDelete, MdEdit, MdEditOff, MdMoreVert } from 'react-icons/md'
import { Todo } from './utils/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { localStoreTodos, setTodos } from './store/todoListSlice';
import Swal from 'sweetalert2';

interface Props {
	todo: Todo;
	onHandleEdit: () => void;
}

const TodoAction: React.FC<Props> = ({ todo, onHandleEdit }) => {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.todoList.todos);

	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleDone = (id: number) => {
		let newTodos = todos.map((item) => (item.id === id ? {
			...item,
			isDone: !item.isDone,
			id: Date.now()
		} : item));

		dispatch(setTodos(newTodos));
		dispatch(localStoreTodos(newTodos));
	};

	const handleProtect = () => {
		Swal.fire({
			title: "Protect this todo?",
			icon: "warning",
			text: 'This will prevent the todo from deletion unless marked as done!',
			showCancelButton: true,
			confirmButtonColor: "#EF7C56",
			confirmButtonText: "Protect"
		}).then((result) => {
			if (result.isConfirmed) {
				let updatedTodos = todos.map((item) => (item.id === todo.id ? {
					...item,
					isProtected: true,
					id: Date.now()
				} : item));

				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure you want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#FF5733",
			confirmButtonText: "Delete"
		}).then((result) => {
			if (result.isConfirmed) {
				let updatedTodos = todos.filter((item) => item.id !== todo.id);

				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	return (
		<div className="relative flex justify-between items-center mt-2">
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
				className={`cursor-pointer transform transition duration-300 ${(todo.isProtected && !todo.isDone) ? 'text-red-300' : 'text-red-500 hover:scale-110'}`}
				onClick={(todo.isProtected && !todo.isDone) ? undefined : () => handleDelete()}
				title={(todo.isProtected && !todo.isDone) ? 'Cannot delete since protected' : 'Delete this task'}
			>
				<MdDelete size={24} />
			</span>

			<span
				className="text-gray-500 cursor-pointer transform hover:scale-110 transition duration-300"
				onClick={toggleDropdown}
				title="More actions"
			>
				<MdMoreVert size={24} />
			</span>

			{dropdownVisible && (
				<div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-white text-blue-950 border rounded shadow-lg z-10">
					<div className="flex flex-col">
						<button
							className="text-left px-4 py-2 hover:bg-gray-200"
							onClick={!todo.isProtected ? () => handleProtect() : undefined}
							title={todo.isProtected ? 'This task is protected' : 'Protect this task'}
						>
							Protect
						</button>
					</div>
				</div>
			)}
		</div>
	)
};

export default TodoAction;
