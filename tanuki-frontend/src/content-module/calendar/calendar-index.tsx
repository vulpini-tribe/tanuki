import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $calendarStore } from './store';

import CalendarFeed from './feed';
import CalendarMain from './main';
import FeedWidgets from './widgets';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { useGetHistory } from './hooks';

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

	return (
		<>
			<CalendarFeed />
			<CalendarMain />
			<FeedWidgets />
		</>
	);
};

export default CalendarIndex;
