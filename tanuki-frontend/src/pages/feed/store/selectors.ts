import type { FeedStoreT } from '../types.d';

export const dayDataSelector = (store: FeedStoreT) => {
	const partialDayData = store.allHistoryEntries[store.activeDate] || {};
	const fullDayData = store.fullHistoryEntries[partialDayData.day] || {};

	const _ = {
		...partialDayData,
		...fullDayData
	};

	if (!_.day) {
		_.day = store.activeDate;
	}

	return _;
};
