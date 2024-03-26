import { DateTime } from 'luxon';

import $feedStore from './store';
import { setFrom, setActiveDate, setFullHistoryEntry, setHistoryEntries, setTo } from './actions';

import type { PartialHistoryEntryT, FeedStoreT } from '../types.d';

$feedStore.on(setFrom, (store, nextValue) => {
	const nextStore = { ...store };
	nextStore.from = nextValue;
	return nextStore;
});

$feedStore.on(setActiveDate, (store, nextValue) => {
	const nextStore = { ...store };
	nextStore.activeDate = nextValue;
	return nextStore;
});

// uuid & data
$feedStore.on(setFullHistoryEntry, (store, { day, data }) => {
	const nextStore = { ...store };

	nextStore.fullHistoryEntries[day] = {
		...data,
		meals: data.meals.map((item) => ({
			...item,
			datetime: DateTime.fromISO(item.created_at as string)
		}))
	};

	return nextStore;
});

$feedStore.on(setHistoryEntries, (store, nextValue) => {
	const nextStore = { ...store };

	const partialHistoryHash = nextValue.reduce(
		(acc: FeedStoreT['allHistoryEntries'], item: PartialHistoryEntryT) => ({
			...acc,
			[item.day]: item
		}),
		{}
	);

	nextStore.allHistoryEntries = partialHistoryHash;
	return nextStore;
});

$feedStore.on(setTo, (store, nextValue) => {
	const nextStore = { ...store };
	const nextTo = DateTime.fromISO(nextValue);
	const nextToISO = nextTo.startOf('month').toISODate() as string;

	if (nextTo > DateTime.fromISO(store.activeDate)) {
		nextStore.activeDate = nextToISO;
	}

	nextStore.to = nextToISO;

	return nextStore;
});
