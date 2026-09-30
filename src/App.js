import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAutoRefresh from "./custom_hooks/useAutoRefresh";
import Kiosk from "./pages/kiosk";
import TedX from "./pages/tedx";

const routes = {
	"/tedx": TedX
}

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1800000
			}
		}
	})

	useAutoRefresh();

	const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
	const Page = routes[path] || Kiosk;

	return (
		<QueryClientProvider client={queryClient}>
			<Page />
		</QueryClientProvider>
	);
}

export default App;
