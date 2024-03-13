import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { Grid, Box, Heading } from '@radix-ui/themes';

const today = DateTime.now();
import { useDayMatrix, useGetHistory } from './hooks';
import { SharedFeed } from '../../shared';
import { Month, Week, Day } from './calendar-feed.styles';

const CalendarFeed = () => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const months = useDayMatrix();
	const [searchParams] = useSearchParams();
	const request = useGetHistory({ from, to });
	const navigate = useNavigate();

	useEffect(() => {
		const queryDate = searchParams.get('date');

		if (queryDate) {
			const dateFromQuery = DateTime.fromISO(queryDate as string);

			const nextFrom = DateTime.now();
			let nextTo = dateFromQuery.startOf('month');

			const difference = nextFrom.diff(nextTo, 'days').days;

			if (difference < 180) {
				nextTo = nextFrom.minus({ days: 180 }).startOf('month');
			}

			setFrom(nextFrom.toISODate() as string);
			setTo(nextTo.toISODate() as string);

			return;
		}

		const isoDay = today.toISODate();
		const link = createLink(ROUTES.CONTENT.FEED, { date: isoDay });

		navigate(link);
	}, []);

	useEffect(() => {
		if (!from || !to) return;

		request.refetch();
	}, [from, to]);

	return (
		<SharedFeed>
			<Box pt="5" pr="6" pl="2">
				<Grid flow="row" rows="min-content" gap="3">
					{Object.entries(months)
						.reverse()
						.map(([key, month]) => {
							const testMonth = DateTime.fromFormat(key, 'MM-yyyy');
							const isCurrentYear = testMonth.year === today.year;

							return (
								<Box key={key} mb="4">
									<Heading size="4" mb="3" as="h2" style={{ textAlign: 'right' }}>
										{testMonth.toLocaleString({ month: 'long', year: isCurrentYear ? undefined : 'numeric' })}
									</Heading>

									<Month>
										{Object.entries(month)
											.reverse()
											.map(([weekKey, days]) => {
												return (
													<Week key={weekKey}>
														{days.map((day: DateTime) => {
															if (!day) return <Day key={Math.random()} />;
															const isoDay = day.toISODate() || '';
															const fromNextMonth = !day.hasSame(testMonth, 'month');
															const isAfterToday = day > today;
															const isActive = searchParams.get('date') === isoDay && !fromNextMonth;

															return (
																<NavLink key={isoDay} to={createLink(ROUTES.CONTENT.FEED, { date: isoDay })}>
																	<Day $fromNextMonth={fromNextMonth || isAfterToday} $isToday={isActive}>
																		{day.toFormat('d')}
																	</Day>
																</NavLink>
															);
														})}
													</Week>
												);
											})}
									</Month>
								</Box>
							);
						})}
				</Grid>
			</Box>
		</SharedFeed>
	);
};

export default CalendarFeed;
