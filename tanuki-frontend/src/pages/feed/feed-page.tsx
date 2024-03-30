import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import $feedStore from '@pages/feed/store';

import { useGetHistoryEntry } from './hooks';

import Feed from './views/feed';
import Widgets from './views/widgets';
import DatePicker from './views/date-picker';
import Root from './feed-page.styles';

const FeedPage = () => {
	const feedStore = useUnit($feedStore);
	const getHistoryReq = useGetHistoryEntry(feedStore.activeDate);

	useEffect(() => {
		getHistoryReq.refetch();
	}, [feedStore.activeDate]);

	return (
		<Root>
			<DatePicker />
			<Widgets />
			<Feed />
		</Root>
	);
};

export default FeedPage;
