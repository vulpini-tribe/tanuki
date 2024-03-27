import React, { useMemo } from 'react';
import { DateTime } from 'luxon';

import DayEntry from '@pages/feed/views/history-entry/day-entry';
import { Month, Week, Header } from './month-entry.styles';
import { Box, Heading } from '@radix-ui/themes';

const today = DateTime.now();
import type { Props } from './month-entry.d';

const MonthEntry = ({ monthKey, month }: Props) => {
	const firstDayOfMonth = DateTime.fromFormat(monthKey, 'MM-yyyy');
	const isCurrentYear = firstDayOfMonth.year === today.year;

	const monthMatrix = useMemo(() => {
		return Object.entries(month).reverse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [monthKey]);

	return (
		<Box mb="4">
			<Heading size="4" mb="3" asChild>
				<Header>
					{firstDayOfMonth.toLocaleString({
						month: 'long',
						year: isCurrentYear ? undefined : 'numeric'
					})}
				</Header>
			</Heading>

			<Month>
				{monthMatrix.map(([weekKey, days]) => {
					return (
						<Week key={weekKey}>
							{days.map((day: DateTime) => (
								<DayEntry key={day.toISODate()} day={day} firstDayOfMonth={firstDayOfMonth} />
							))}
						</Week>
					);
				})}
			</Month>
		</Box>
	);
};

export default MonthEntry;
