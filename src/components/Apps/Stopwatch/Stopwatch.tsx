import React, { useEffect, useRef, useState } from 'react'
import calculateTime from '../../../helpers/Timer';
import Control from './Control';

const Stopwatch: React.FC = () => {

	const [time, setTime] = useState<number>(0);
	const [timeArray, setTimeArray] = useState<number[]>([]);
	const [intervalId, setIntervalId] = useState<number>(0)


	useEffect(() => {
		let timeArray: number[] = calculateTime(time);
		setTimeArray(timeArray);
	}, [time]);

	function handlePlay() {
		let interval: any = setInterval(() => {
			setTime((prev: number) => prev + 1);
		}, 1000);

		setIntervalId(interval)
	}

	function handleStop() {
		clearInterval(intervalId)
	}

	function handleReset() {
		clearInterval(intervalId);
		setTime(0)
	}


	return (
		<div>
			<section className='flex'>
				<p>{timeArray[0]}</p>
				<span>:</span>
				<p>{timeArray[1]}</p>
				<span>:</span>
				<p>{timeArray[2]}</p>
			</section>

			<Control handlePlay={handlePlay} handleStop={handleStop} handleReset={handleReset} />
		</div>

	)
}

export default Stopwatch