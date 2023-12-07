import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { store, persistor } from '@core/store';

import { FemboySun } from '@images';

import { ResetStyles, GeneralStyles } from '@core/styles';
import MainRoot, { Header, BlackSun } from './Root.styles';

// Prevent multiple fonts loading
import '@core/styles/fonts.css';

const queryClient = new QueryClient();
// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AuthManager = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ['/api/dishes'],
		queryFn: () => fetch(`${apiUrl}/dishes`).then((res) => res.json())
	});

	if (isPending) return 'Loading...';

	if (error) return 'An error has occurred: ' + error.message;

	console.log(data);

	return (
		<MainRoot>
			<Header>Femboy</Header>
			<BlackSun>
				<FemboySun />
			</BlackSun>
			<Header>Party</Header>
		</MainRoot>
	);
};

const Root = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<QueryClientProvider client={queryClient}>
				<ResetStyles />
				<GeneralStyles />

				<AuthManager />
			</QueryClientProvider>
		</PersistGate>
	</Provider>
);

export default Root;
