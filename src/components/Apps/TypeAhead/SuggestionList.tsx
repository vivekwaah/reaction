import React from 'react'

interface Props {
	suggestions: Array<any>,
	onSuggestionSelected: (suggestion: Object) => void,
	searchedKey: string,
	highlightedIndex: number
}

const SuggestionList: React.FC<Props> = ({ suggestions, onSuggestionSelected, searchedKey, highlightedIndex }) => {
	const highlightText = (text: string, searchText: string) => {
		const regex = new RegExp(searchText, 'gi');
		const newText = text.replace(regex, `<mark>$&</mark>`);
		return <span dangerouslySetInnerHTML={{ __html: newText }} />;
	}

	return (
		<>
			{suggestions.length > 0 && (
				<ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
					{suggestions.map((suggestion, index) => (
						<li
							className={`${highlightedIndex === index ? 'bg-slate-300' : 'bg-white'} p-2 hover:bg-gray-200 cursor-pointer`}
							onClick={() => onSuggestionSelected(suggestion)}
							key={index}
						>
							{highlightText(suggestion.name, searchedKey)}
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default SuggestionList
