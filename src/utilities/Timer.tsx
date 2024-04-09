const calculateTime = (time: number): number[] => {
	let hours = Math.floor(time / 3600);
	let minutes = Math.floor(time - (hours * 3600) / 60);
	let seconds = Math.floor(time - (hours * 3600) - (minutes * 60));

	return [
		hours,
		minutes,
		seconds
	]
}

export default calculateTime;