import React from 'react';
import { useLocation } from 'react-router-dom';

import ROUTES from '@routes';

import Root from './shared-feed.styles';
import { ScrollArea, Grid, Flex, Badge, TextField } from '@radix-ui/themes';

const titles = {
	[ROUTES.CONTENT.FEED]: 'Calendar Filters',
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
			<Grid p="2" flow="column" gap="3" columns="1fr 1fr">
				<TextField.Input type="date" placeholder="From" variant="soft" color="gray" />
				<TextField.Input type="date" placeholder="To" variant="soft" color="gray" />
			</Grid>

			<Flex p="2" gap="1" wrap="wrap">
				<Badge>All time</Badge>
				<Badge>Year</Badge>
				<Badge>Half-year</Badge>
				<Badge>Month</Badge>
				<Badge>Fortnight</Badge>
			</Flex>

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 48px)' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedFeed;
