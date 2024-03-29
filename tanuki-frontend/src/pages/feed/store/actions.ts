import { createEvent } from 'effector';

import type { FullHistoryEntryT, FeedStoreT } from '../types.d';

type SetActiveDateT = FeedStoreT['activeDate'];
type SetFullHistoryT = {
	day: string;
	data: FullHistoryEntryT;
};

export const setActiveDate = createEvent<SetActiveDateT>();
export const setFullHistoryEntry = createEvent<SetFullHistoryT>();
