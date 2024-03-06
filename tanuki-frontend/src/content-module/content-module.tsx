import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import ROUTES from '@routes';

import CalendarFeed from './calendar-feed';
import Profile from './profile';

const ContentModule = () => {
	return (
		<div>
			<CalendarFeed />
			<Profile />

			{/* <Routes>
				<Route path={ROUTES.INDEX.ROOT} element={<IndexModule />} />

				<Route path="*" element={<Navigate to={ROUTES.INDEX.ROOT} replace />} />
			</Routes> */}
		</div>
	);
};

export default ContentModule;
