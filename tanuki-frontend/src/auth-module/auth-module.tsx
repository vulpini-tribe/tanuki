import React from 'react';
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
	const isAuthorized = false;

	switch (true) {
		// case 404
		// case 403
		case isAuthorized:
			return children;
		// case 401:
		default:
			return <AuthRoot />;
	}
};

export default AuthModuleRoot;
