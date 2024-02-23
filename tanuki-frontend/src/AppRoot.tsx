import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { Theme, Container } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { FemboySun } from '@images';
import AuthModule from './auth-module';
import ContentModule from './content-module';

import { ResetStyles, GeneralStyles } from '@core/styles';

// Prevent multiple fonts loading
// import '@core/styles/fonts.css';
import '@core/styles/fonts.css';
import '@radix-ui/themes/styles.css';
import '@core/styles/theme-config.css';
import 'react-toastify/dist/ReactToastify.min.css';

// @ts-ignore
// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const queryClient = new QueryClient();

const Root = () => (
	<QueryClientProvider client={queryClient}>
		<Theme
			appearance="light"
			accentColor="grass"
			grayColor="slate"
			panelBackground="solid"
			radius="large"
			scaling="110%"
		>
			<ResetStyles />
			<BrowserRouter>
				<AuthModule>
					<ContentModule />
				</AuthModule>

				<ToastContainer />

				{/* <ThemePanel /> */}
			</BrowserRouter>
		</Theme>
	</QueryClientProvider>
);

export default Root;
