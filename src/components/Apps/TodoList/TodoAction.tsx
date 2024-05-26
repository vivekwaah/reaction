import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaUndo } from 'react-icons/fa';
import { MdDelete, MdEdit, MdEditOff, MdFullscreen, MdMoreVert } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TodoLargeView from './TodoLargeView';
import { Todo } from './utils/model';
import { RootState } from '../../../state/store';
import { localStoreTodos, setTodos } from './store/todoListSlice';

interface Props {
	todo: Todo;
	onHandleEdit: () => void;
}

const TodoAction: React.FC<Props> = ({ todo, onHandleEdit }) => {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.todoList.todos);

	const [showLargeView, setShowLargeView] = useState<boolean>(false);
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
		const updatedTodos = todos.map((item) =>
			item.id === id ? { ...item, isDone: !item.isDone, id: Date.now() } : item
		);

		dispatch(setTodos(updatedTodos));
		dispatch(localStoreTodos(updatedTodos));
	};

	const handleProtect = () => {
		Swal.fire({
			title: 'Protect this todo?',
			icon: 'warning',
			text: 'This will prevent the todo from deletion unless marked as done!',
			showCancelButton: true,
			confirmButtonColor: '#EF7C56',
			confirmButtonText: 'Protect',
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedTodos = todos.map((item) =>
					item.id === todo.id ? { ...item, isProtected: true, id: Date.now() } : item
				);

				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const handleDelete = () => {
		Swal.fire({
			title: 'Are you sure you want to delete?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#FF5733',
			confirmButtonText: 'Delete',
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedTodos = todos.filter((item) => item.id !== todo.id);

				dispatch(setTodos(updatedTodos));
				dispatch(localStoreTodos(updatedTodos));
			}
		});
	};

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const toggleLargeView = () => {
		setShowLargeView(!showLargeView);
	};

	return (
		<div className="relative flex justify-between items-center mt-4 p-2 bg-gray-100 rounded-lg shadow-md">
			{showLargeView && <TodoLargeView todo={todo} onClose={toggleLargeView} />}

			<span
				className="text-green-500 cursor-pointer transform hover:scale-125 transition duration-200"
				onClick={() => handleDone(todo.id)}
				title={todo.isDone ? 'Undo' : 'Mark as done'}
			>
				{todo.isDone ? <FaUndo size={24} /> : <FaCheck size={24} />}
			</span>

			<span
				className={`cursor-pointer transform transition duration-200 ${todo.isDone ? 'text-blue-300' : 'text-blue-500 hover:scale-125'}`}
				onClick={!todo.isDone ? onHandleEdit : undefined}
				title={todo.isDone ? 'Todo marked as done' : 'Edit todo'}
			>
				<MdEdit size={24} />
			</span>

			<span
				className={`cursor-pointer transform transition duration-200 ${(todo.isProtected && !todo.isDone) ? 'text-red-300' : 'text-red-500 hover:scale-125'}`}
				onClick={(todo.isProtected && !todo.isDone) ? undefined : handleDelete}
				title={(todo.isProtected && !todo.isDone) ? 'Cannot delete since protected' : 'Delete this task'}
			>
				<MdDelete size={24} />
			</span>

			<span
				className="text-gray-500 cursor-pointer transform hover:scale-125 transition duration-200"
				onClick={toggleDropdown}
				title="More actions"
			>
				<MdMoreVert size={24} />
			</span>

			{dropdownVisible && (
				<div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 border rounded-lg shadow-lg z-10">
					<div className="flex flex-col">
						<span
							className={`flex justify-between items-center text-left px-4 py-2 ${todo.isProtected ? 'text-red-300' : 'text-red-500 cursor-pointer'}`}
							onClick={!todo.isProtected ? handleProtect : undefined}
							title={todo.isProtected ? 'This task is protected' : 'Protect this task'}
						>
							<span>Protect</span>
							<MdEditOff size={24} className={`ml-2 ${todo.isProtected ? '' : 'cursor-pointer text-red-500 transform hover:scale-125 transition duration-200'}`} />
						</span>
						<span
							className="flex justify-between items-center text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
							onClick={toggleLargeView}
							title="View large"
						>
							<span>View</span>
							<MdFullscreen size={24} className="cursor-pointer transform hover:scale-125 transition duration-200 ml-2" />
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoAction;
