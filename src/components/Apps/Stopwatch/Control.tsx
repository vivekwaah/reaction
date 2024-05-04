import React from 'react';

interface Props {
	handlePlay: Function;
	handleStop: Function;
	handleReset: Function;
}

const Control: React.FC<Props> = ({ handlePlay, handleStop, handleReset }) => {
	return (
		<div className="flex space-x-3">
			<button
				className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
				onClick={() => handlePlay()}
			>
				Start
			</button>
			<button
				className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
				onClick={() => handleStop()}
			>
				Stop
			</button>
			<button
				className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
				onClick={() => handleReset()}
			>
				Reset
			</button>
		</div>
	);
};

export default Control;
