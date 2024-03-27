import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

import { FeedPage } from '@pages';
import DishesIndex from './dishes';
import Food from './food';
import HomePage from './home-page';

import NavBar from './navbar';
import UtilsPage from './utils-page';

const ContentModule = () => {
	return (
		<div>
			<Routes>
				<Route path={ROUTES.CONTENT.ROOT} element={<HomePage />} />
				<Route path={ROUTES.CONTENT.FEED} element={<FeedPage />} />
				<Route path={ROUTES.CONTENT.DISHES} element={<DishesIndex />} />
				<Route path={ROUTES.CONTENT.FOOD} element={<Food />} />

				<Route path={ROUTES.UTILS.ROOT} element={<UtilsPage />} />

				<Route index path="*" element={<Navigate to={ROUTES.CONTENT.ROOT} replace />} />
			</Routes>

			<NavBar />
		</div>
	);
};

export default ContentModule;
