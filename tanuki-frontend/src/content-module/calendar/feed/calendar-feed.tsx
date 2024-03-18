import React from 'react';
import { DateTime } from 'luxon';
import { NavLink } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $calendarStore, setActiveDate } from '../store';

import HeaderContent from './header';
import { SharedFeed } from '../../shared';
import { Grid, Box, Heading } from '@radix-ui/themes';
import { Month, Week, Day } from './calendar-feed.styles';

const today = DateTime.now();
import { useDayMatrix } from './hooks';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';

const CalendarFeed = () => {
	const { from, to, activeDate } = useUnit($calendarStore);
	const months = useDayMatrix(from, to);

	return (
		<SharedFeed header={<HeaderContent />}>
			<Box pt="5" pr="6" pl="2">
				<Grid flow="row" rows="min-content" gap="3">
					{months.map(([key, month]) => {
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

														const isAfterToday = day > today;
														const isoDay = day.toISODate() || '';
														const fromNextMonth = !day.hasSame(testMonth, 'month');
														const isActive = activeDate === isoDay && !fromNextMonth;

														if (isAfterToday) {
															return (
																<Day key={isoDay} $fromNextMonth={fromNextMonth || isAfterToday} $isToday={isActive}>
																	{day.toFormat('d')}
																</Day>
															);
														}

														return (
															<NavLink
																key={isoDay}
																to={createLink(ROUTES.CONTENT.FEED, { date: isoDay })}
																onClick={() => {
																	setActiveDate(isoDay);
																}}
															>
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
