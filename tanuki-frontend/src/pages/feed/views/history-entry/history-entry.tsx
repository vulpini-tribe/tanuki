import React from 'react';
import { useUnit } from 'effector-react';

import { useDayMatrix } from './hooks';
import $feedStore from '@pages/feed/store';

import HeaderContent from './header';
import MonthEntry from './month-entry';
import { Grid, Box, ScrollArea } from '@radix-ui/themes';
import Root from './history-entry.styles';

const HistoryEntry = () => {
	const { from, to } = useUnit($feedStore);
	const months = useDayMatrix(from, to);

	return (
		<Root>
			<HeaderContent />

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 100px)' }}>
				<Box pt="5" pr="4" pl="2">
					<Grid flow="row" rows="min-content" gap="3">
						{months.map(([monthKey, month]) => (
							<MonthEntry key={monthKey} monthKey={monthKey} month={month} />
						))}
					</Grid>
				</Box>
			</ScrollArea>
		</Root>
	);
};

export default HistoryEntry;
