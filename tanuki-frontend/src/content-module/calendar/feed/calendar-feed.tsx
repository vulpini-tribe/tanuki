import React from 'react';
import { DateTime } from 'luxon';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $calendarStore, setFrom, setTo, MIN_DATE } from '../store';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { Grid, Box, Heading } from '@radix-ui/themes';
import { Flex, Badge, TextField } from '@radix-ui/themes';

const today = DateTime.now();
import { useDayMatrix } from './hooks';
import { SharedFeed } from '../../shared';
import { Month, Week, Day } from './calendar-feed.styles';

const HeaderContent = () => {
	const { from, to } = useUnit($calendarStore);

	const onFromHd = (e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value);
	const onToHd = (e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value);

	const onAllTimeHd = () => {
		setFrom(today.toISODate());
		setTo(MIN_DATE);
	};

	const onYearHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ years: 1 }).toISODate());
	};

	const onHalfYearHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ months: 6 }).toISODate());
	};

	const onMonthHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ months: 1 }).toISODate());
	};

	return (
		<>
			<Grid p="2" flow="column" gap="3" columns="1fr 1fr">
				<TextField.Input type="date" placeholder="From" variant="soft" color="gray" value={from} onChange={onFromHd} />
				<TextField.Input type="date" placeholder="To" variant="soft" color="gray" value={to} onChange={onToHd} />
			</Grid>

			<Flex p="2" gap="1" wrap="wrap">
				<Badge onClick={onAllTimeHd}>All time</Badge>
				<Badge onClick={onYearHd}>Year</Badge>
				<Badge onClick={onHalfYearHd}>Half-year</Badge>
				<Badge onClick={onMonthHd}>Month</Badge>
			</Flex>
		</>
	);
};

const CalendarFeed = () => {
	const { from, to } = useUnit($calendarStore);
	const months = useDayMatrix(from, to);
	const [searchParams] = useSearchParams();

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
														const isActive = searchParams.get('date') === isoDay && !fromNextMonth;
														if (isAfterToday) {
															return (
																<Day key={isoDay} $fromNextMonth={fromNextMonth || isAfterToday} $isToday={isActive}>
																	{day.toFormat('d')}
																</Day>
															);
														}

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
