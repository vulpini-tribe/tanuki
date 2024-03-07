import React from 'react';

import { ScrollArea } from '@radix-ui/themes';
import Root from './shared-main.styles';

const SharedMain = ({ children }) => {
	return (
		<Root>
			<ScrollArea scrollbars="vertical" style={{ height: '100%' }}>
				{children}
			</ScrollArea>
		</Root>
	);
};

export default SharedMain;
