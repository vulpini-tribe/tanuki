import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import $feedStore from '@pages/feed/store';
import { useWindowSize } from 'usehooks-ts';

import HistoryEntry from './views/history-entry';
import MealsEntry from './views/meals-entry';
import WidgetsEntry from './views/widgets';

import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import { useGetHistory } from './hooks';

const CalendarIndex = () => {
	const { width = 0, height = 0 } = useWindowSize();
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
			<MealsEntry />
			{(height >= 700 || width >= 1280) && <WidgetsEntry />}
		</>
	);
};

export default CalendarIndex;
