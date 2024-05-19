import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useOnlineStatus = () => {

	const [onlineStatus, setOnlineStatus] = useState(true);

	useEffect(() => {
		window.addEventListener("offline", () => {
			setOnlineStatus(false);

			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				}
			});

			Toast.fire({
				icon: "error",
				title: "Seems you are offline. Please check your internet connection!",
			});
		});

		window.addEventListener("online", () => {
			setOnlineStatus(true);
		});
	}, [])

	return onlineStatus;
}

export default useOnlineStatus;