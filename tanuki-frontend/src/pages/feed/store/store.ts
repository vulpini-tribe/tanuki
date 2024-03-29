import { createStore } from 'effector';

import { find_init_date } from '../utils';
import type { FeedStoreT } from '../types.d';

const $feedStore = createStore<FeedStoreT>({
	activeDate: find_init_date(),
	fullHistoryEntries: {}
});

export default $feedStore;
