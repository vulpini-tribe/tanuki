import { createStore } from 'effector';

import { find_init_date } from '../utils';
import type { FeedStoreT } from '../types.d';

const { today, activeDate, toDate } = find_init_date();

const $feedStore = createStore<FeedStoreT>({
	from: today,
	to: toDate.toISODate() as string,
	activeDate,
	allHistoryEntries: {},
	fullHistoryEntries: {}
});

export default $feedStore;
