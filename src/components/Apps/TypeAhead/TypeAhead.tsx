import React from 'react'
import Autofill from './Autofill';

const TypeAhead: React.FC = () => {
	const fetchSuggestions = async (inputValue: string) => {
		let response = await fetch('https://dummyjson.com/recipes/search?q=' + inputValue)

		if (!response.ok) {
			throw new Error('Something went wrong while fetching the API!')
		}

		const result = await response.json();
		return result.recipes;
	}

	const onSuggestionSelected = (selectedSuggestion: Object): void => {
		console.log(selectedSuggestion);
	}

	return (
		<div>
			<Autofill
				placeholder={"Search a value"}
				fetchSuggestions={fetchSuggestions}
				customLoading={<>Loading...</>}
				staticData={[]}
				onSuggestionSelected={onSuggestionSelected}
				customStyles={{ borderRadius: "5px", color: 'black', backgroundColor: 'white' }}
			/>
		</div>
	)
}

export default TypeAhead
