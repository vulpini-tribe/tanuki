import React from 'react';

import Root from './shared-widgets.styles';
import { ScrollArea } from '@radix-ui/themes';

const SharedWidgets = ({ children }) => {
	return (
		<Root>
			<ScrollArea scrollbars="vertical" style={{ height: '100%' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedWidgets;
