import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ROUTES from '@routes';

const Forbidden = React.lazy(() => import('@pages/Forbidden'));

const Restricted = () => (
	<React.Suspense fallback={<div />}>
		<Routes>
			<Route path={ROUTES.FORBIDDEN} element={<Forbidden />} />
		</Routes>
	</React.Suspense>
);

export default Restricted;
