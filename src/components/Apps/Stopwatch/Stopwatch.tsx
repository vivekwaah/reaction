import React, { useState, useRef } from 'react';
import { calculateTime } from '../../../utilities/Timer';

const Stopwatch: React.FC = () => {
	const [time, setTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [laps, setLaps] = useState<number[]>([]);
	const intervalRef = useRef<number>();

	const startStopwatch = () => {
		intervalRef.current = window.setInterval(() => {
			setTime(prevTime => prevTime + 1);
		}, 1000);
		setIsRunning(true);
	};

	const stopStopwatch = () => {
		clearInterval(intervalRef.current);
		setIsRunning(false);
	};

	const resetStopwatch = () => {
		clearInterval(intervalRef.current);
		setTime(0);
		setLaps([]);
		setIsRunning(false);
	};

	const recordLap = () => {
		setLaps([...laps, time]);
	};

	return (
		<div className="flex flex-col items-center mt-10">
			<div className="text-4xl mb-5">{calculateTime(time)}</div>
			<div className="space-x-4">
				{!isRunning ? (
					<button
						className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
						onClick={startStopwatch}
					>
						Start
					</button>
				) : (
					<>
						<button
							className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
							onClick={stopStopwatch}
						>
							Stop
						</button>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
							onClick={recordLap}
						>
							Lap
						</button>
					</>
				)}
				<button
					className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
					onClick={resetStopwatch}
				>
					Reset
				</button>
			</div>
			{laps.length > 0 && (
				<div className="mt-5">
					<h2 className="text-2xl">Lap Times</h2>
					<ul className="list-disc pl-8">
						{laps.map((lap, index) => (
							<li key={index} className="text-lg">{calculateTime(lap)}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Stopwatch;
