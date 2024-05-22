import React, { useState, useEffect } from 'react';
import CpsStats from './CpsStats';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import UserCpsStats from './utils/models';

const ClickCounter: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(0);
	const [timerCount, setTimerCount] = useState<number>(0);
	const [userTime, setUserTime] = useState<number>(0);
	const [timerId, setTimerId] = useState<number | null>(null);
	const [clicksPerSecond, setClicksPerSecond] = useState<number>(0);
	const [isCounting, setIsCounting] = useState<boolean>(false);
	const [toggleStats, setToggleStats] = useState(false);
	const [inputValidation, setInputValidation] = useState<boolean>(false);
	const [cpsStatsData, setCpsStatsData] = useState<UserCpsStats>({
		last_record: '0',
		avg_record: '0',
		total_attempts: '0'
	});

	const handleCountdownInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const seconds: number = parseInt(event.target.value);
		setUserTime(seconds);
	};

	const startCountdown = (): void => {
		if (!userTime) {
			setInputValidation(true);
			return;
		}

		setInputValidation(false);

		setClickCount(0);
		setTimerCount(0);
		setTimerId(null);
		setClicksPerSecond(0);

		setIsCounting(true);

		const id: number = setInterval(() => {
			setTimerCount((prevCount) => prevCount + 1);
		}, 1000);

		setTimerId(id);
	};

	const resetTimer = () => {
		setClickCount(0);
		setTimerCount(0);
		setUserTime(0);
		setTimerId(null);
		setClicksPerSecond(0);
		setIsCounting(false);
	}

	const handleUserClickCount = () => {
		if (!userTime || !isCounting) {
			return;
		}

		setClickCount((prevCount) => prevCount + 1);
	};

	useEffect(() => {
		if (timerCount === userTime && isCounting) {
			clearInterval(timerId!);
			setIsCounting(false);
			setUserTime(0);
			let cps = parseFloat((clickCount / userTime).toFixed(2));
			setClicksPerSecond(cps);

			let fetchedUserCpsStats = localStorage.getItem('cps_stats');
			let cpsStats: UserCpsStats = {
				last_record: cps,
				avg_record: cps,
				total_attempts: 1
			};

			if (fetchedUserCpsStats) {
				try {
					const parsedStats = JSON.parse(fetchedUserCpsStats);
					if (parsedStats && typeof parsedStats === 'object') {
						const totalRecords = parsedStats.last_record + cps;
						const totalAttempts = parsedStats.total_attempts + 1;
						const avgRecord = (totalRecords / totalAttempts).toFixed(2);

						cpsStats = {
							last_record: cps,
							avg_record: avgRecord,
							total_attempts: totalAttempts
						};
					}
				} catch (error) {
					console.error('Error parsing user CPS stats:', error);
				}
			}

			setCpsStatsData(cpsStats);
			localStorage.setItem("cps_stats", JSON.stringify(cpsStats));
		}
	}, [timerCount, userTime, isCounting, timerId, clickCount]);

	useEffect(() => {
		let cpsStats: UserCpsStats = {
			last_record: 0,
			avg_record: 0,
			total_attempts: 0
		};

		let fetchedUserCpsStats = localStorage.getItem('cps_stats');

		if (fetchedUserCpsStats) {
			try {
				const parsedStats = JSON.parse(fetchedUserCpsStats);
				if (parsedStats && typeof parsedStats === 'object') {
					const lastRecords = parsedStats.last_record;
					const totalAttempts = parsedStats.total_attempts;
					const avgRecord = parsedStats.avg_record;

					cpsStats = {
						last_record: lastRecords,
						avg_record: avgRecord,
						total_attempts: totalAttempts
					};
				}
			} catch (error) {
				console.error('Error parsing user CPS stats:', error);
			}
		}

		setCpsStatsData(cpsStats);
	}, []);

	return (
		<div>

			<div className="relative mb-4">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="w-full border-t border-gray-300" />
				</div>
				<div className="relative flex items-center justify-between">
					<span className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">CPS</span>
					<button
						type="button"
						className={`inline-flex items-center gap-x-1.5 rounded-full bg-white ml-3 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${toggleStats && "bg-slate-300"
							}`} onClick={() => setToggleStats(!toggleStats)}
					>
						{
							toggleStats ?
								(<PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />) :
								(<MinusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />)
						}
					</button>
				</div>
			</div>

			{toggleStats === false ? <CpsStats userStats={cpsStatsData} /> : ''}

			<div className="select-none min-h-screen flex flex-col items-center bg-slate-400 font-neucha" onClick={handleUserClickCount}>

				<div className="mx-auto max-w-2xl lg:text-center">
					<p className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Clicks Per Second
					</p>
					<p className="mt-1 mb-4 text-sm leading-8 text-gray-600">
						Here's a reason to buy new mouse. Click it.
					</p>
				</div>

				{isCounting && (
					<>
						<span> Time Left: {userTime - timerCount}</span>
						<p>Clicks: {clickCount}</p>
					</>
				)}

				{!isCounting && (
					<>
						<input
							type="number"
							placeholder="Enter time in seconds"
							onChange={handleCountdownInputChange}
							className={`mt-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${inputValidation && 'border-rose-700'}`}
						/>
						<button
							onClick={startCountdown}
							className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						>
							Start
						</button>
					</>
				)}

				{clicksPerSecond > 0 && (
					<>
						<p>Clicks per second: {clicksPerSecond}</p>
						<button
							onClick={resetTimer}
							className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
						>
							Reset
						</button>
					</>
				)}
			</div>
		</div >


	);
};

export default ClickCounter;
