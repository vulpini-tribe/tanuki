import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

const Auth = React.lazy(() => import('@pages/Auth'));

const NotAuthorized = () => (
	<React.Suspense fallback={<>...</>}>
		<Routes>
			<Route path={ROUTES.AUTH.ROOT} element={<Auth />} />

			<Route path="*" element={<Navigate to={ROUTES.AUTH.ROOT} replace />} />
		</Routes>
	</React.Suspense>
);

export default NotAuthorized;
