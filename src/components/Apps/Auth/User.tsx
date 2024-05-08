import React, { useState, useEffect } from "react";
import axios from "axios";
import { DUMMY_API } from "./utils/config";
import { IdentificationIcon, InboxIcon, RssIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const User: React.FC = () => {
	const [userData, setUserData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const loginUser = useSelector((state: RootState) => state.authenticate.user);

	useEffect(() => {
		axios.get(`${DUMMY_API}/auth/me`, {
			headers: {
				'Authorization': `Bearer ${loginUser?.token}`,
			},
		})
			.then(response => {
				setUserData(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Error fetching user data:', error);
				setLoading(false);
			});
	}, [loginUser]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md max-w-md w-full">
				{loading ? (
					<div className="text-center">Loading...</div>
				) : userData ? (
					<div>
						<div className="text-center mb-4">
							<img src={userData.image} alt="User Avatar" className="rounded-full w-20 h-20 mx-auto mb-2" />
							<h2 className="text-xl font-semibold">{userData.username}</h2>
							<p className="text-gray-500">{userData.email}</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Details</h3>
							<ul>
								<li className="flex items-center mb-2">
									<span className="w-6 h-6 mr-2 flex-shrink-0">
										<IdentificationIcon />
									</span>
									{userData.firstName} {userData.lastName}
								</li>
								<li className="flex items-center mb-2">
									<span className="w-6 h-6 mr-2 flex-shrink-0">
										<InboxIcon />
									</span>
									{userData.email}
								</li>
								<li className="flex items-center mb-2">
									<span className="w-6 h-6 mr-2 flex-shrink-0">
										<RssIcon />
									</span>
									{userData.gender}
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="text-center text-red-500">Failed to fetch user data</div>
				)}
			</div>
		</div>
	);
};

export default User;
