import React, { useEffect, useState } from 'react';
import Autofill from './Autofill';
import { Switch } from '@headlessui/react';
import SearchHistory from './SearchHistory';
import { HistoryEntry } from './utils/model';

const TypeAhead: React.FC = () => {
	const [enabled, setEnabled] = useState<boolean>(false);
	const [history, setHistory] = useState<HistoryEntry[]>([]);

	const TYPEAHEAD_HISTORY_ENABLE = 'reaction-type-ahead-history-enable';
	const TYPEAHEAD_HISTORY = 'reaction-type-ahead-history';

	useEffect(() => {
		const savedHistory = localStorage.getItem(TYPEAHEAD_HISTORY);
		if (savedHistory) {
			setHistory(JSON.parse(savedHistory));
		}

		const isSavedHistoryEnable = localStorage.getItem(TYPEAHEAD_HISTORY_ENABLE);
		const isEnabled = isSavedHistoryEnable === 'true';

		if (isEnabled !== enabled) {
			setEnabled(isEnabled);
		}
	}, []);

	useEffect(() => {
		if (history.length) {
			localStorage.setItem(TYPEAHEAD_HISTORY, JSON.stringify(history));
		}
	}, [history]);

	useEffect(() => {
		localStorage.setItem(TYPEAHEAD_HISTORY_ENABLE, enabled.toString());
	}, [enabled]);

	const setHistoryEnable = (val: boolean) => {
		setEnabled(val)
	}

	const fetchSuggestions = async (inputValue: string) => {
		let response = await fetch('https://dummyjson.com/recipes/search?q=' + inputValue);

		if (localStorage.getItem(TYPEAHEAD_HISTORY_ENABLE)) {
			const newEntry: HistoryEntry = { time: new Date().toLocaleString(), value: inputValue };
			setHistory(prevHistory => [newEntry, ...prevHistory]);
		}

		if (!response.ok) {
			throw new Error('Something went wrong while fetching the API!');
		}

		const result = await response.json();
		return result.recipes;
	}

	const onSuggestionSelected = (selectedSuggestion: Object): void => {
		console.log(selectedSuggestion);
	}

	return (
		<div className="flex flex-col p-4 space-y-4">
			<div className="flex space-x-4">
				<Autofill
					placeholder="Search recipe..."
					fetchSuggestions={fetchSuggestions}
					customLoading={<div>Loading...</div>}
					staticData={[]}
					onSuggestionSelected={onSuggestionSelected}
					customStyles={{ borderRadius: "5px", color: 'black', backgroundColor: 'white', width: '50%' }}
				/>

				<div className="flex items-center space-x-2">
					<Switch
						checked={enabled}
						onChange={setHistoryEnable}
						className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
					>
						<span className="sr-only">Toggle setting</span>
						<span
							aria-hidden="true"
							className={`absolute h-5 w-5 rounded-full transition-transform duration-200 ease-in-out transform ${enabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray-100'}`}
						/>
					</Switch>
					<span>Save History</span>
				</div>
			</div>

			{enabled && <SearchHistory history={history} />}
		</div>
	)
}

export default TypeAhead;
