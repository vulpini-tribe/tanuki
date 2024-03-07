import React from 'react';
import { useLocation } from 'react-router-dom';

import ROUTES from '@routes';

import Root from './shared-feed.styles';
import { ScrollArea, Box, Heading } from '@radix-ui/themes';

const titles = {
	[ROUTES.CONTENT.FEED]: 'Calendar Feed',
	[ROUTES.CONTENT.DISHES]: 'Dishes',
	[ROUTES.CONTENT.FOOD]: 'Food'
};

const useFeedTitle = () => {
	const location = useLocation();

	return titles[location.pathname] || 'Feed';
};

const SharedFeed = ({ children }) => {
	const title = useFeedTitle();

	return (
		<Root>
			<Box p="3">
				<Heading size="3" as="h1">
					{title}
				</Heading>
			</Box>

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 48px)' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedFeed;
