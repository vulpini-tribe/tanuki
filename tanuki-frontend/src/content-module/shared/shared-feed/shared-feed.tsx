import React from 'react';

import Root from './shared-feed.styles';
import { ScrollArea } from '@radix-ui/themes';

const SharedFeed = ({ header, children }) => {
	return (
		<Root>
			{header && header}

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 100px)' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedFeed;
