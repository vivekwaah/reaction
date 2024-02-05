import React from 'react'

interface Props {
	handlePlay: Function,
	handleStop: Function,
	handleReset: Function,
}

const Control: React.FC<Props> = ({ handlePlay, handleReset, handleStop }) => {
	return (

		<span className="isolate inline-flex rounded-md shadow-sm">
			<button
				type="button"
				className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 mr-3"
				onClick={() => handlePlay()}
			>
				Start
			</button>
			<button
				type="button"
				className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 mr-3 rounded-md"
				onClick={() => handleStop()}
			>
				Stop
			</button>
			<button
				type="button"
				className="relative -ml-px inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
				onClick={() => handleReset()}
			>
				Reset
			</button>
		</span>
	)
}

export default Control