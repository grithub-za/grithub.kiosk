import { useEffect } from "react";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default function useAutoRefresh(intervalMs = THREE_HOURS_MS) {
	useEffect(() => {
		const id = setInterval(() => {
			window.location.reload();
		}, intervalMs);

		return () => clearInterval(id);
	}, [intervalMs]);
}
