import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import SignUp from './sign-up';
import SignInPage from './sign-in';
import ResetPassword from './reset-password';
import SetPassword from './set-password';

import ROUTES from '@routes';
import Root, { LeafBackground, Content } from './auth-module.styles';

import { Grid, Flex, Button } from '@radix-ui/themes';

import logoUrl from '@assets/images/logo.svg';
import logoUrl2 from '@assets/images/logo-2.svg';
import leafUrl from '@assets/images/leaf.svg';

import type { Props } from './auth-module.d';

const AuthRoot = () => (
	<Root>
		<LeafBackground $leafUrl={leafUrl} />

		<Content>
			<Grid flow="column" columns="1fr max-content">
				<Grid flow="row" gap="3">
					<img src={logoUrl} alt="Sogaz" />
					<img src={logoUrl2} alt="Sogaz" />
				</Grid>

				<Flex gap="6" height="max-content" align="center">
					<Button asChild radius="small" variant="ghost" highContrast>
						<NavLink to={ROUTES.AUTH.SIGN_IN}>Sign In</NavLink>
					</Button>
					<Button asChild radius="small" variant="outline" highContrast>
						<NavLink to={ROUTES.AUTH.SIGN_UP}>Sign Up</NavLink>
					</Button>
				</Flex>
			</Grid>

			<Flex align="center" justify="center" style={{ height: 'calc(100% - 160px)' }}>
				<Routes>
					<Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
					<Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
					<Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
					<Route path={ROUTES.AUTH.NEW_PASSWORD} element={<SetPassword />} />

					<Route path="*" element={<Navigate to={ROUTES.AUTH.SIGN_IN} replace />} />
				</Routes>
			</Flex>
		</Content>
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
