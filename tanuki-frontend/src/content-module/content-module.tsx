import React from 'react';
import { Outlet, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ROUTES from '@routes';

import CalendarFeed from './calendar-feed';
import Profile from './profile';
import NavBar from './navbar';
import DishesFeed from './dishes';
import FoodFeed from './food-feed';
import Settings from './settings';
import { Box, Heading, ScrollArea } from '@radix-ui/themes';
import { SettingsEntry, Feed } from './content-module.styles';

const titles = {
	[ROUTES.CONTENT.FEED]: 'Calendar Feed',
	[ROUTES.CONTENT.DISHES]: 'Dishes',
	[ROUTES.CONTENT.FOOD]: 'Food'
};

const useFeedTitle = () => {
	const location = useLocation();

	return titles[location.pathname] || 'Feed';
};

const ContentModule = () => {
	const title = useFeedTitle();

	return (
		<div>
			<Feed>
				<Box p="3">
					<Heading size="3" as="h1">
						{title}
					</Heading>
				</Box>

				<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 48px)' }}>
					<Outlet />
					{/* <Routes>
						<Route path={ROUTES.CONTENT.FEED} element={<CalendarFeed />} />
						<Route path={ROUTES.CONTENT.DISHES} element={<DishesFeed />} />
						<Route path={ROUTES.CONTENT.FOOD} element={<FoodFeed />} />

						<Route path="*" element={<Navigate to={ROUTES.CONTENT.FEED} replace />} />
					</Routes> */}
				</ScrollArea>
			</Feed>
		</div>
	);
};

const TestTEst = () => {
	return (
		<div>
			<Routes>
				<Route path={`${ROUTES.CONTENT.ROOT}`} element={<ContentModule />}>
					<Route path={ROUTES.CONTENT.FEED} element={<CalendarFeed />} />
					<Route path={ROUTES.CONTENT.DISHES} element={<DishesFeed />} />
					<Route path={ROUTES.CONTENT.FOOD} element={<FoodFeed />} />

					<Route path="*" element={<Navigate to={ROUTES.CONTENT.FEED} replace />} />
				</Route>

				<Route path={ROUTES.SETTINGS.ROOT} element={<Settings />} />

				<Route path="*" element={<Navigate to={ROUTES.CONTENT.ROOT} replace />} />
			</Routes>

			<SettingsEntry>
				<NavBar />
				<Profile />
			</SettingsEntry>
		</div>
	);
};

export default TestTEst;
