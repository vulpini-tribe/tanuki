import React from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Outlet, Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';

import ROUTES from '@routes';

import CalendarFeed from './calendar-feed';
import Profile from './profile';
import NavBar from './navbar';
import DishesFeed from './dishes';
import FoodFeed from './food-feed';
import Settings from './settings';
import { Box, Button, Heading, ScrollArea } from '@radix-ui/themes';
import { SettingsEntry, Feed, NavbarS, MainContent } from './content-module.styles';
import { NavLink } from 'react-router-dom';

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
	const { width = 0 } = useWindowSize();
	const [searchParams] = useSearchParams();

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
				</ScrollArea>

				{searchParams.get('date') && (
					<MainContent>
						<ScrollArea scrollbars="vertical" style={{ height: '100%' }}>
							<div>{searchParams.get('date')}</div>

							<NavLink to={ROUTES.CONTENT.FEED}>Back</NavLink>
						</ScrollArea>
					</MainContent>
				)}
			</Feed>
		</div>
	);
};

const TestTEst = () => {
	return (
		<div>
			<Routes>
				<Route path={ROUTES.CONTENT.ROOT} element={<ContentModule />}>
					<Route path={ROUTES.CONTENT.FEED} element={<CalendarFeed />} />
					<Route path={ROUTES.CONTENT.DISHES} element={<DishesFeed />} />
					<Route path={ROUTES.CONTENT.FOOD} element={<FoodFeed />} />

					<Route index path="*" element={<Navigate to={ROUTES.CONTENT.FEED} replace />} />
				</Route>

				<Route path={ROUTES.UTILS.ROOT} element={<Settings />} />

				<Route index path="*" element={<Navigate to={ROUTES.CONTENT.ROOT} replace />} />
			</Routes>

			<SettingsEntry>
				<NavBar as={NavbarS} />
				<Profile />
			</SettingsEntry>
		</div>
	);
};

export default TestTEst;
