import type { FeedStoreT } from '../types.d';

export const dayDataSelector = (store: FeedStoreT) => {
	const fullDayData = store.fullHistoryEntries[store.activeDate] || {};

	if (!fullDayData.day) {
		fullDayData.day = store.activeDate;
	}

	return fullDayData;
};
