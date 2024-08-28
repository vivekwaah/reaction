import React from 'react';
import { HistoryEntry } from './utils/model';

interface SearchHistoryProps {
	history: HistoryEntry[];
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history }) => {
	return (
		<div className="w-full mt-4">
			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr>
						<th className="border border-gray-300 px-4 py-2">Search Value</th>
						<th className="border border-gray-300 px-4 py-2">Time</th>
					</tr>
				</thead>
				<tbody>
					{history.length > 0 ? (
						history.map((entry, index) => (
							<tr key={index}>
								<td className="border border-gray-300 px-4 py-2">{entry.value}</td>
								<td className="border border-gray-300 px-4 py-2">{entry.time}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={2} className="border border-gray-300 px-4 py-2 text-center">No history available</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default SearchHistory;
