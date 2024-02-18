import { useRef } from "react";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			<form
				className="flex w-90 relative items-center"
				onSubmit={(e) => {
					handleAdd(e);
					inputRef.current?.blur();
				}}
			>
				<textarea
					className="w-full rounded-full p-5 text-2xl border-none transition duration-200 shadow-inner"
					placeholder="Write todo"
					value={todo}
					onChange={(e) => {
						setTodo(e.target.value);
					}}>
				</textarea>

				<button className="absolute w-12 h-12 m-3 rounded-full right-0 border-none bg-blue-500 text-white transition duration-200 shadow-md hover:bg-blue-600 active:scale-80 active:shadow-sm" type="submit">
					Add
				</button>
			</form>
		</div>
	);
};

export default InputField;
