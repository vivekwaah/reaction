import React, { useState } from "react";
import { DUMMY_API } from "./utils/config";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";

const Auth: React.FC = () => {
	const [userName, setUserName] = useState("kminchelle");
	const [userPassword, setUserPassword] = useState("0lelplR");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setErrorMessage("");
		setLoading(true);

		axios.post(`${DUMMY_API}/auth/login`, {
			username: userName,
			password: userPassword,
			expiresInMins: 30,
		})
			.then((response) => {
				setLoading(false);

				console.log(response.data)
				dispatch(setUser(response.data))

				Swal.fire({
					title: "Login successful",
					icon: "success",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Cool!"
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/auth/user', { replace: true });
					}
				});
			})
			.catch((error) => {
				setLoading(false);
				setErrorMessage(error.message);
			});
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Login
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Username
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="text"
									required
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={userPassword}
									onChange={(e) => setUserPassword(e.target.value)}
									className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							{errorMessage && (
								<span className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 my-4 rounded relative items-center flex">
									{errorMessage}
								</span>
							)}

							<button
								type="submit"
								onClick={(e) => handleFormSubmit(e)}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
								{loading && (
									<div className="flex justify-center mx-2">
										<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400"></div>
									</div>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default Auth;
