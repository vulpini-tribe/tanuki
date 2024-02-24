import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthModule from './auth-module';
import ContentModule from './content-module';

// Prevent multiple fonts loading
import '@core/styles/fonts.css';
import '@radix-ui/themes/styles.css';
import '@core/styles/theme-config.css';

import { ResetStyles } from '@core/styles';

// @ts-ignore
// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const queryClient = new QueryClient();

const Root = () => {
	return (
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
					<Toaster position="top-right" />
					<AuthModule>
						<ContentModule />
					</AuthModule>

					{/* <ThemePanel /> */}
				</BrowserRouter>
			</Theme>
		</QueryClientProvider>
	);
};

export default Root;
