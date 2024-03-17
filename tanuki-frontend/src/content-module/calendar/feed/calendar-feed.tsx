import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { Grid, Box, Heading } from '@radix-ui/themes';
import { Flex, Badge, TextField } from '@radix-ui/themes';

const today = DateTime.now();
import { useDayMatrix } from './hooks';
import { SharedFeed } from '../../shared';
import { Month, Week, Day } from './calendar-feed.styles';

type Props = {
	from: string;
	to: string;
	setFrom: (from: string) => void;
	setTo: (to: string) => void;
};

const HeaderContent = ({ from, to, setFrom, setTo }) => {
	const onFromHd = (e) => {
		setFrom(e.target.value);
	};

	const onToHd = (e) => {
		setTo(e.target.value);
	};

	const onAllTimeHd = () => {
		setFrom(today.toISODate());
		setTo('1970-01-01');
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

const CalendarFeed = ({ from, to, setFrom, setTo }: Props) => {
	const months = useDayMatrix(from, to);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const activeDate = searchParams.get('date');

		if (activeDate) return;

		const isoDay = today.toISODate();
		const link = createLink(ROUTES.CONTENT.FEED, { date: isoDay });

		navigate(link);
	}, []);

	return (
		<SharedFeed header={<HeaderContent from={from} to={to} setFrom={setFrom} setTo={setTo} />}>
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
