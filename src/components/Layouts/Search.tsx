import React, { useState } from 'react';
import { AppNavigations } from '../../navigations/AppNavigations';
import AppNavigationsModel from '../../navigations/AppNavigationsModel';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const [searchText, setSearchText] = useState('');
	const [filteredApps, setFilteredApps] = useState<AppNavigationsModel[]>([]);
	const navigate = useNavigate();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputText = event.target.value;
		setSearchText(inputText);
		const filtered = AppNavigations.filter(app =>
			app.name.toLowerCase().includes(inputText.toLowerCase())
		);
		setFilteredApps(filtered);
	};

	const handleRedirect = (route: string) => {
		setSearchText('');
		setFilteredApps([]);
		navigate(route, { replace: true });
	};

	const handleBlur = () => {
		setFilteredApps([]);
	};

	return (
		<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

			<input
				id="search-field"
				className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
				placeholder="Search... for apps"
				type="search"
				name="search"
				value={searchText}
				onChange={handleInputChange}
			// onBlur={handleBlur}
			/>

			{filteredApps.length > 0 && (
				<div className="absolute z-10 w-full bg-white rounded-lg shadow-md mt-16">
					{filteredApps.map(app => (
						<div
							key={app.route}
							onClick={() => handleRedirect(app.route)}
							className="px-4 py-3 cursor-pointer hover:bg-gray-100"
						>
							{app.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;