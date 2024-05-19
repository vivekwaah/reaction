import React from 'react';
import useOnlineStatus from '../../hooks/useOnlineStatus';

const OnlineStatus: React.FC = () => {
	const onlineStatus = useOnlineStatus();

	return (
		<div className="flex items-end ml-5 cursor-pointer">
			<span className="relative flex h-3 w-3" title={onlineStatus ? 'Online' : ''}>
				<span
					className={`absolute inline-flex h-full w-full rounded-full ${onlineStatus ? 'bg-green-400' : 'bg-red-400'} ${!onlineStatus && 'animate-ping'} opacity-75`}
				></span>
				<span
					className={`relative inline-flex rounded-full h-3 w-3 ${onlineStatus ? 'bg-green-500' : 'bg-red-500'} ${!onlineStatus && 'animate-ping'}`}
				></span>
			</span>
			<span className="ml-2 text-sm font-medium text-gray-100">
				{onlineStatus ? '' : 'Offline'}
			</span>
		</div>
	);
};

export default OnlineStatus;
