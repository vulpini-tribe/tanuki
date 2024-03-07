import React from 'react';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

import CalendarIndex from './calendar';
import DishesIndex from './dishes';

import NavBar from './navbar';
import Profile from './navbar/profile';
import FoodFeed from './food-feed';
import UtilsPage from './utils-page';

import { NavbarS, SettingsEntry } from './content-module.styles';

const ContentModule = () => {
	return (
		<div>
			<Routes>
				<Route path={ROUTES.CONTENT.ROOT} element={<CalendarIndex />} />
				<Route path={ROUTES.CONTENT.DISHES} element={<DishesIndex />} />
				{/* <Route path={ROUTES.CONTENT.FOOD} element={<FoodFeed />} /> */}

				{/* <Route index path="*" element={<Navigate to={ROUTES.CONTENT.FEED} replace />} /> */}
				{/* </Route> */}

				<Route path={ROUTES.UTILS.ROOT} element={<UtilsPage />} />

				<Route index path="*" element={<Navigate to={ROUTES.CONTENT.ROOT} replace />} />
			</Routes>

			<SettingsEntry>
				<NavBar as={NavbarS} />
				<Profile />
			</SettingsEntry>
		</div>
	);
};

export default ContentModule;
