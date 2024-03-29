import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import $feedStore from '@pages/feed/store';
// import { useWindowSize } from 'usehooks-ts';

// import HistoryEntry from './views/history-entry';
// import MealsEntry from './views/meals-entry';
// import WidgetsEntry from './views/widgets';

import DatePicker from './views/date-picker';
import Feed from './views/feed';
import Widgets from './views/widgets';

import { useGetHistoryEntry } from './hooks';

const CalendarIndex = () => {
	const feedStore = useUnit($feedStore);
	const getHistoryReq = useGetHistoryEntry(feedStore.activeDate);

	useEffect(() => {
		getHistoryReq.refetch();
	}, [feedStore.activeDate]);

	return (
		<>
			<DatePicker />
			<Widgets />
			<Feed />
		</>
	);

	// return (
	// 	<>
	// 		<HistoryEntry />
	// 		<MealsEntry />
	// 		<WidgetsEntry />
	// 	</>
	// );
};

export default CalendarIndex;
