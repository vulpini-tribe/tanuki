import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { FemboySun } from '@images';
import AuthManager from './AuthManager';

import { ResetStyles, GeneralStyles } from '@core/styles';
// import MainRoot, { Header, BlackSun } from './Root.styles';

// Prevent multiple fonts loading
import '@core/styles/fonts.css';
import 'react-toastify/dist/ReactToastify.min.css';

// @ts-ignore
// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// const AuthManager = () => {
// 	const { isPending, error, data } = useQuery({
// 		queryKey: ['/api/dishes'],
// 		queryFn: () => fetch(`${apiUrl}/dishes`).then((res) => res.json())
// 	});

// 	if (isPending) return 'Loading...';

// 	if (error) return 'An error has occurred: ' + error.message;

// 	console.log(data);

// 	return (
// 		<MainRoot>
// 			<Header>Femboy</Header>
// 			<BlackSun>
// 				<FemboySun />
// 			</BlackSun>
// 			<Header>Party</Header>
// 		</MainRoot>
// 	);
// };

const queryClient = new QueryClient();

const Root = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ResetStyles />
			<GeneralStyles />

			<AuthManager />
			<ToastContainer />
		</BrowserRouter>
	</QueryClientProvider>
);

export default Root;
