import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import ROUTES from '@routes';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Root, { Actions } from './Authorization.styles';

const Authorization = () => {
	return (
		<Root>
			<React.Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
					<Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />

					<Route path="*" element={<Navigate to={ROUTES.AUTH.SIGN_IN} replace />} />
				</Routes>
			</React.Suspense>

			<Actions>
				<Link to={ROUTES.AUTH.SIGN_IN}>Sign In</Link>
				<Link to={ROUTES.AUTH.SIGN_UP}>Sign Up</Link>
			</Actions>
		</Root>
	);
};

export default Authorization;
