import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';

import CalendarIndex from './calendar';
import DishesIndex from './dishes';
import Food from './food';

import NavBar from './navbar';
import Profile from './navbar/profile';
import UtilsPage from './utils-page';

import { NavbarS, SettingsEntry } from './content-module.styles';

const ContentModule = () => {
	return (
		<div>
			<Routes>
				<Route path={ROUTES.CONTENT.FEED} element={<CalendarIndex />} />
				<Route path={ROUTES.CONTENT.DISHES} element={<DishesIndex />} />
				<Route path={ROUTES.CONTENT.FOOD} element={<Food />} />

				<Route path={ROUTES.UTILS.ROOT} element={<UtilsPage />} />

				<Route index path="*" element={<Navigate to={ROUTES.CONTENT.FEED} replace />} />
			</Routes>

			<SettingsEntry>
				<NavBar as={NavbarS} />
				<Profile />
			</SettingsEntry>
		</div>
	);
};

export default ContentModule;
