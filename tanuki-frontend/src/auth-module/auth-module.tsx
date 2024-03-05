import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './sign-up';
import SignInPage from './sign-in';
import ResetPassword from './reset-password';
import SetPassword from './set-password';
import ValidateEmail from './validate-email';

import ROUTES from '@routes';
import Root, { Logo, Content, SideContent, Image } from './auth-module.styles';

import logoUrl from '@assets/images/logo.svg';
import tanukiUrl from '@assets/images/tanuki.jpg';

import type { Props } from './auth-module.d';

import { useUnit } from 'effector-react';
import { $authStore, toggleAuth, setUserId } from './store';

import { useQuery } from '@tanstack/react-query';

import axios from '@axios';

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useProfile = () => {
	const authStore = useUnit($authStore);

	const { isFetching, refetch, dataUpdatedAt, data } = useQuery({
		queryKey: ['/api/user', authStore.userId],
		queryFn: () =>
			axios({
				method: 'get',
				url: `${apiUrl}/users/${authStore.userId}`,
				// headers: {
				// 	'Content-Type': 'application/x-www-form-urlencoded'
				// },
				withCredentials: true
			}),
		enabled: false,
		retry: 0
	});

	useEffect(() => {
		const userId = window.localStorage.getItem('user_id');

		if (userId) {
			setUserId(userId);
		}
	}, []);

	useEffect(() => {
		if (!authStore.userId) {
			return;
		}

		refetch();
	}, [authStore.userId]);

	useEffect(() => {
		if (!dataUpdatedAt) {
			return;
		}

		if (data.status === 200) {
			toggleAuth(true);
		}
	}, [dataUpdatedAt]);

	return {
		isFetching
	};
};

const AuthRoot = () => (
	<Root>
		<Logo $src={logoUrl} />

		<Content>
			<Routes>
				<Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
				<Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
				<Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
				<Route path={ROUTES.AUTH.NEW_PASSWORD} element={<SetPassword />} />
				<Route path={ROUTES.AUTH.VALIDATE} element={<ValidateEmail />} />

				<Route path="*" element={<Navigate to={ROUTES.AUTH.SIGN_IN} replace />} />
			</Routes>
		</Content>

		<SideContent>
			<Image $src={tanukiUrl} />
		</SideContent>
	</Root>
);

const AuthModuleRoot = ({ children }: Props) => {
	const authStore = useUnit($authStore);
	const { isFetching } = useProfile();

	switch (true) {
		case isFetching:
			return <div>Loading...</div>;
		case authStore.isAuthorized:
			return children;
		default:
			return <AuthRoot />;
	}
};

export default AuthModuleRoot;
