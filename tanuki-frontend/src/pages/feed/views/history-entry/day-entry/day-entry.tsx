import React from 'react';
import { DateTime } from 'luxon';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';

import $feedStore, { setActiveDate } from '@pages/feed/store';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';

import Root from './day-entry.styles';
import type { Props } from './day-entry.d';

const today = DateTime.now();

const DayEntry = ({ day, firstDayOfMonth }: Props) => {
	const { activeDate } = useUnit($feedStore);

	const isAfterToday = day > today;
	const isoDay = day.toISODate() || '';
	const fromNextMonth = !day.hasSame(firstDayOfMonth, 'month');
	const isActive = activeDate === isoDay && !fromNextMonth;

	const onSetActiveDay = () => setActiveDate(isoDay);

	if (isAfterToday) {
		return (
			<Root $fromNextMonth={fromNextMonth || isAfterToday} $isToday={isActive}>
				{day.toFormat('d')}
			</Root>
		);
	}

	return (
		<NavLink to={createLink(ROUTES.CONTENT.FEED, { date: isoDay })} onClick={onSetActiveDay}>
			<Root $fromNextMonth={fromNextMonth || isAfterToday} $isToday={isActive}>
				{day.toFormat('d')}
			</Root>
		</NavLink>
	);
};

export default React.memo(DayEntry);
