import React, { useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $calendarStore } from './store';

import CalendarFeed from './feed';
import CalendarMain from './main';
import CalendarWidgets from './widgets';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { useGetHistory } from './hooks';

type HistoryDayT = {
	id: string;
	day: string;
	calories: number;
	weight: number;
};

const CalendarIndex = () => {
	const [searchParams] = useSearchParams();
	const calendarStore = useUnit($calendarStore);
	const navigate = useNavigate();

	const getHistoryReq = useGetHistory();

	useEffect(() => {
		const queryDate = searchParams.get('date');

		if (queryDate !== calendarStore.activeDate) {
			const link = createLink(ROUTES.CONTENT.FEED, { date: calendarStore.activeDate });

			navigate(link);
		}

		getHistoryReq.refetch();
	}, [calendarStore.from, calendarStore.to]);

	const history_days_list = getHistoryReq.data?.data?.data || [];

	const history_days_map = history_days_list.reduce((acc: { [key: string]: HistoryDayT }, item: HistoryDayT) => {
		return {
			...acc,
			[item.day]: item
		};
	}, {});

	const activeDayInfo = useMemo(() => {
		const queryDate = searchParams.get('date');

		return history_days_map[queryDate || ''] || {};
	}, [history_days_map, searchParams]);

	return (
		<>
			<CalendarFeed />
			<CalendarMain {...activeDayInfo} />
			<CalendarWidgets />
		</>
	);
};

export default CalendarIndex;
