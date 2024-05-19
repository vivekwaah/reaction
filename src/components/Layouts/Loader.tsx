import React from 'react'

const Loader: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="relative w-16 h-16">
				<div className="absolute border-4 border-t-transparent border-indigo-600 rounded-full w-16 h-16 animate-spin"></div>
			</div>
		</div>
	)
}

export default Loader