import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

import DishesIndex from './dishes';
import Food from './food';
import HomePage from './home-page';

import NavBar from './navbar';

const FeedPage = React.lazy(() => import('@pages/feed'));
const UtilsPage = React.lazy(() => import('@pages/utils'));

// Profile
const ProfilePage = React.lazy(() => import('@pages/profile'));
const Goals = React.lazy(() => import('@pages/profile/goals'));
const ProfileRoot = React.lazy(() => import('@pages/profile/root'));

const ContentModule = () => {
	return (
		<div>
			<React.Suspense fallback={<>...</>}>
				<Routes>
					<Route path={ROUTES.CONTENT.ROOT} element={<HomePage />} />
					<Route path={ROUTES.CONTENT.FEED} element={<FeedPage />} />
					<Route path={ROUTES.CONTENT.DISHES} element={<DishesIndex />} />
					<Route path={ROUTES.CONTENT.FOOD} element={<Food />} />

					<Route path={ROUTES.UTILS.ROOT} element={<UtilsPage />} />

					<Route path={ROUTES.PROFILE.ROOT} element={<ProfilePage />}>
						<Route path={ROUTES.PROFILE.GOALS} element={<Goals />} />
						<Route path={ROUTES.PROFILE.ROOT} element={<ProfileRoot />} />

						<Route path="*" element={<Navigate to={ROUTES.PROFILE.ROOT} replace />} />
					</Route>

					<Route index path="*" element={<Navigate to={ROUTES.CONTENT.ROOT} replace />} />
				</Routes>
			</React.Suspense>

			<NavBar />
		</div>
	);
};

export default ContentModule;
