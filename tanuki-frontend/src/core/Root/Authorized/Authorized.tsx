import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { MainContent } from './Authorized.styles';

const Index = React.lazy(() => import('@pages/Index'));

const Authorized = () => {
	return (
		<>
			<header>NavBar content</header>

			<MainContent>
				<React.Suspense fallback={<>...</>}>
					<Routes>
						<Route path="/main/*" element={<Index />} />

						<Route path="*" element={<Navigate to="/main" replace />} />
					</Routes>
				</React.Suspense>
			</MainContent>
		</>
	);
};

export default Authorized;
