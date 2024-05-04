export const calculateTime = (time: number): string => {
	let hours = Math.floor(time / 3600);
	let remainingTime = time - hours * 3600;
	let minutes = Math.floor(remainingTime / 60);
	let seconds = remainingTime % 60;

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = seconds.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}