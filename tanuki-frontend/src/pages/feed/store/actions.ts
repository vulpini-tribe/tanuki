import { createEvent } from 'effector';

import type { PartialHistoryEntryT, FullHistoryEntryT, FeedStoreT } from '../types.d';

type FromT = FeedStoreT['from'];
type ToT = FeedStoreT['to'];
type SetHistoryEntriesT = PartialHistoryEntryT[];
type SetActiveDateT = FeedStoreT['activeDate'];
type SetFullHistoryT = {
	day: PartialHistoryEntryT['day'];
	data: FullHistoryEntryT;
};

export const setFrom = createEvent<FromT>();
export const setTo = createEvent<ToT>();
export const setHistoryEntries = createEvent<SetHistoryEntriesT>();
export const setActiveDate = createEvent<SetActiveDateT>();
export const setFullHistoryEntry = createEvent<SetFullHistoryT>();
