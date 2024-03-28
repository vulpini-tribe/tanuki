import React from 'react';
import { useUnit } from 'effector-react';

import { useDayMatrix } from './hooks';
import { useWindowSize } from 'usehooks-ts';
import $feedStore, { setActiveDate } from '@pages/feed/store';

import HeaderContent from './header';
import MonthEntry from './month-entry';
import { Grid, Box, ScrollArea, TextField } from '@radix-ui/themes';
import Root, { SmallRoot } from './history-entry.styles';

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

const HistoryEntrySmall = () => {
	const { activeDate } = useUnit($feedStore);

	const onActiveDateChangeHd = (e) => {
		setActiveDate(e.target.value);
	};

	return (
		<SmallRoot>
			<TextField.Input
				type="date"
				placeholder="Date"
				variant="soft"
				color="gray"
				value={activeDate}
				onChange={onActiveDateChangeHd}
			/>
		</SmallRoot>
	);
};

const HistoryRouter = () => {
	const { width = 0 } = useWindowSize();

	if (width >= 740) {
		return <HistoryEntry />;
	}

	return <HistoryEntrySmall />;
};

export default HistoryRouter;
