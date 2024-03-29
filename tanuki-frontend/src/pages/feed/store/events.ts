import { DateTime } from 'luxon';

import $feedStore from './store';
import { setActiveDate, setFullHistoryEntry } from './actions';

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
			created_at: DateTime.fromISO(item.created_at as string)
		}))
	};

	return nextStore;
});
