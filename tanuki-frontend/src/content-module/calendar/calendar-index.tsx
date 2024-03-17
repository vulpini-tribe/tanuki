import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import CalendarFeed from './feed';
import CalendarMain from './main';
import CalendarWidgets from './widgets';

import { useGetHistory } from './hooks';

type HistoryDayT = {
	id: string;
	day: string;
	calories: number;
	weight: number;
};

const CalendarIndex = () => {
	const [to, setTo] = useState('');
	const [from, setFrom] = useState('');
	const [searchParams] = useSearchParams();

	const getHistoryReq = useGetHistory({ from, to });

	useEffect(() => {
		const queryDate = searchParams.get('date');

		if (!queryDate) {
			return;
		}

		const dateFromQuery = DateTime.fromISO(queryDate as string);

		const nextFrom = DateTime.now();
		let nextTo = dateFromQuery.startOf('month');

		const difference = nextFrom.diff(nextTo, 'days').days;

		if (difference < 180) {
			nextTo = nextFrom.minus({ days: 180 }).startOf('month');
		}

		setFrom(nextFrom.toISODate() as string);
		setTo(nextTo.toISODate() as string);
	}, []);

	useEffect(() => {
		if (!from || !to) return;

		getHistoryReq.refetch();
	}, [from, to]);

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

	console.log(history_days_map);

	return (
		<>
			<CalendarFeed from={from} to={to} setFrom={setFrom} setTo={setTo} />
			<CalendarMain {...activeDayInfo} />
			<CalendarWidgets />
		</>
	);
};

export default CalendarIndex;
