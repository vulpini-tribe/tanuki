import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

import Profile from './profile';
import IndexModule from './index-module';

const ContentModule = () => {
	return (
		<div>
			<Profile />

			<Routes>
				<Route path={ROUTES.INDEX.ROOT} element={<IndexModule />} />

				<Route path="*" element={<Navigate to={ROUTES.INDEX.ROOT} replace />} />
			</Routes>
		</div>
	);
};

export default ContentModule;
