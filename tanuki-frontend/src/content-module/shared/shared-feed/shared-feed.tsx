import React from 'react';
// import { useLocation } from 'react-router-dom';

// import ROUTES from '@routes';

import Root from './shared-feed.styles';
import { ScrollArea, Grid, Flex, Badge, TextField } from '@radix-ui/themes';

// const titles = {
// 	[ROUTES.CONTENT.FEED]: 'Calendar Filters',
// 	[ROUTES.CONTENT.DISHES]: 'Dishes',
// 	[ROUTES.CONTENT.FOOD]: 'Food'
// };

// const useFeedTitle = () => {
// 	const location = useLocation();

// 	return titles[location.pathname] || 'Feed';
// };

const SharedFeed = ({ header, children }) => {
	return (
		<Root>
			{header && header}

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 48px)' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedFeed;
