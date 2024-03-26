import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import $feedStore from './store';

import HistoryEntry from './views/history-entry';
import DayEntry from './views/main';
import WidgetsEntry from './views/widgets';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { useGetHistory } from './hooks';

const CalendarIndex = () => {
	const [searchParams] = useSearchParams();
	const calendarStore = useUnit($feedStore);
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

	return (
		<>
			<HistoryEntry />
			<DayEntry />
			<WidgetsEntry />
		</>
	);
};

export default CalendarIndex;
