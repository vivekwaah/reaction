import React, { useRef } from "react";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			handleAdd(e);
			inputRef.current?.blur();
		}
	};

	return (
		<div>
			<form
				className="flex w-full items-center"
				onSubmit={(e) => {
					handleAdd(e);
					inputRef.current?.blur();
				}}
			>
				<textarea
					className="w-full p-4 text-xl rounded-lg border-none transition duration-200 shadow-inner text-blue-950"
					placeholder="Add todo. (press ctrl+enter)"
					value={todo}
					onChange={(e) => {
						setTodo(e.target.value);
					}}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				></textarea>

				<button
					className="px-6 py-3 ml-2 bg-green-200 text-blue-950 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
					type="submit"
				>
					Add
				</button>
			</form>
		</div>
	);
};

export default InputField;
