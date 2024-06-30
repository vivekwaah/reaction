import React, { useCallback, useEffect, useState } from 'react'
import SuggestionList from './SuggestionList';
import _ from 'lodash'

interface Props {
	placeholder: string,
	customLoading: any,
	customStyles: React.CSSProperties,
	fetchSuggestions: (inputValue: string) => Promise<any[]>,
	staticData: string[],
	onSuggestionSelected: (suggestion: Object) => void
}

const Autofill: React.FC<Props> = ({
	placeholder,
	customStyles,
	customLoading,
	staticData,
	fetchSuggestions,
	onSuggestionSelected
}) => {
	const [inputValue, setInputValue] = useState('')
	const [suggestions, setSuggestions] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		setHighlightedIndex(-1)
	}

	const getSuggestions = async (inputValue: string) => {
		setError('')
		setLoading(true)

		try {
			let response;

			if (staticData.length > 0) {
				response = staticData.filter((item) => {
					return item.toLowerCase().includes(inputValue.toLowerCase());
				})
			} else {
				response = await fetchSuggestions(inputValue);
			}

			setSuggestions(response)
		} catch (error: any) {
			setError("Something went wrong")
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const debouncedGetSuggestions = useCallback(_.debounce(getSuggestions, 300), []);

	useEffect(() => {
		if (inputValue.length > 1) {
			debouncedGetSuggestions(inputValue)
		} else {
			setSuggestions([])
		}

		return () => {
			console.log('Unmounted')
		};
	}, [inputValue])

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown') {
			setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
		} else if (event.key === 'ArrowUp') {
			setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
		} else if (event.key === 'Enter' && highlightedIndex >= 0) {
			event.preventDefault();
			onSuggestionSelected(suggestions[highlightedIndex]);
		}
	}

	return (
		<div className="relative w-full">
			{loading && <div className="absolute top-full left-0 w-full bg-gray-200 p-2">{customLoading ?? "Loading"}</div>}

			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				style={customStyles}
				className="w-full p-2 border border-gray-300 rounded"
			/>

			<SuggestionList
				suggestions={suggestions}
				onSuggestionSelected={onSuggestionSelected}
				searchedKey={inputValue}
				highlightedIndex={highlightedIndex}
			/>

			{error && <div className="absolute top-full left-0 w-full bg-red-200 p-2">{error}</div>}
		</div>
	)
}

export default Autofill
