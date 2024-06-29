import React from 'react'

const Quiz = () => {
	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-center">Quiz</h2>

			<div className="mb-4 text-lg">
				Q.2 - What is the capital of India?
			</div>

			<div className="mb-2 font-semibold">Options</div>

			<div className="space-y-2 mb-6">
				<label className="flex items-center">
					<input
						type="checkbox"
						value="Delhi"
						className="form-checkbox h-5 w-5 text-blue-600"
					/>
					<span className="ml-2 text-gray-700">Delhi</span>
				</label>
				<label className="flex items-center">
					<input
						type="checkbox"
						value="Mumbai"
						className="form-checkbox h-5 w-5 text-blue-600"
					/>
					<span className="ml-2 text-gray-700">Mumbai</span>
				</label>
				<label className="flex items-center">
					<input
						type="checkbox"
						value="Chennai"
						className="form-checkbox h-5 w-5 text-blue-600"
					/>
					<span className="ml-2 text-gray-700">Chennai</span>
				</label>
				<label className="flex items-center">
					<input
						type="checkbox"
						value="Kolkata"
						className="form-checkbox h-5 w-5 text-blue-600"
					/>
					<span className="ml-2 text-gray-700">Kolkata</span>
				</label>
			</div>

			<button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
				Next
			</button>
		</div>
	)
}

export default Quiz
