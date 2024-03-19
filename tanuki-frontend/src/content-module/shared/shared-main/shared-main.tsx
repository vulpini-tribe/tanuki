import React from 'react';

import { Box, ScrollArea, Heading } from '@radix-ui/themes';
import Root from './shared-main.styles';

const SharedMain = ({ children, header }) => {
	return (
		<Root>
			<Heading mb="2">{header}</Heading>

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 40px)' }}>
				<Box pt="2">{children}</Box>
			</ScrollArea>
		</Root>
	);
};

export default SharedMain;
