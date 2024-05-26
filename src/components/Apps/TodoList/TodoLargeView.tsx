import React from 'react';
import { Todo } from './utils/model';

interface TodoLargeViewProps {
	todo: Todo;
	onClose: () => void;
}

const TodoLargeView: React.FC<TodoLargeViewProps> = ({ todo, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
			<div className="bg-white text-black p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Todo Details</h2>
					<button onClick={onClose} className="text-red-500 hover:text-red-700">
						Close
					</button>
				</div>
				<div>
					<p><strong>Title:</strong> {todo.todo}</p>
					{todo.isProtected && <p><strong>Protected:</strong> Yes</p>}
				</div>
			</div>
		</div>
	);
};

export default TodoLargeView;
