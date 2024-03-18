import { createEvent, createStore } from 'effector';
import QS from 'qs';
import { DateTime } from 'luxon';

export const MIN_DATE = '2010-01-01';
const today = DateTime.local().toISODate();
const minimalDate = DateTime.fromISO(MIN_DATE);

const parsedDate = QS.parse(location.search, { ignoreQueryPrefix: true }).date as string;
let activeDate = DateTime.fromISO(parsedDate).isValid ? parsedDate : today;
activeDate = DateTime.fromISO(activeDate) < minimalDate ? MIN_DATE : activeDate;

const toDate =
	DateTime.fromISO(today).minus({ days: 180 }) < DateTime.fromISO(activeDate)
		? DateTime.fromISO(activeDate).minus({ days: 180 }).startOf('month')
		: DateTime.fromISO(activeDate).startOf('month');

export type PartialHistoryEntry = {
	id: string;
	day: string;
	weight: number;
	calories: number;
};

type ConsumedFoodT = {
	carbs_100: number;
	category_id: string;
	fat_100: number;
	id: string;
	kcal_100: number;
	name: string;
	photo: string;
	portion_weight: number;
	protein_100: number;
	datetime: unknown;
};

type FullHistoryEntry = {
	id: string;
	day: string;
	weight: number;
	calories: number;
	consumed_food: ConsumedFoodT[];
};

type CalendarStore = {
	from: string;
	to: string;
	activeDate: string;
	allHistoryEntries: Record<string, PartialHistoryEntry>;
	fullHistoryEntries: Record<string, FullHistoryEntry>;
};

export const setFrom = createEvent<CalendarStore['from']>();
export const setTo = createEvent<CalendarStore['to']>();
export const setHistoryEntries = createEvent<PartialHistoryEntry[]>();
export const setActiveDate = createEvent<CalendarStore['activeDate']>();
export const setFullHistoryEntry = createEvent<{ id: PartialHistoryEntry['id']; data: FullHistoryEntry }>();

export const $calendarStore = createStore<CalendarStore>({
	from: today,
	to: toDate.toISODate() as string,
	activeDate,
	allHistoryEntries: {},
	fullHistoryEntries: {}
});

$calendarStore.on(setFrom, (store, nextValue) => {
	const nextStore = { ...store };
	nextStore.from = nextValue;
	return nextStore;
});

$calendarStore.on(setActiveDate, (store, nextValue) => {
	const nextStore = { ...store };
	nextStore.activeDate = nextValue;
	return nextStore;
});

// uuid & data
$calendarStore.on(setFullHistoryEntry, (store, { id, data }) => {
	const nextStore = { ...store };

	nextStore.fullHistoryEntries[id] = {
		...data,
		consumed_food: data.consumed_food.map((item) => ({
			...item,
			datetime: DateTime.fromISO(item.datetime as string)
		}))
	};

	return nextStore;
});

$calendarStore.on(setHistoryEntries, (store, nextValue) => {
	const nextStore = { ...store };

	const partialHistoryHash = nextValue.reduce(
		(acc: CalendarStore['allHistoryEntries'], item: PartialHistoryEntry) => ({
			...acc,
			[item.day]: item
		}),
		{}
	);

	nextStore.allHistoryEntries = partialHistoryHash;
	return nextStore;
});

$calendarStore.on(setTo, (store, nextValue) => {
	const nextStore = { ...store };
	const nextTo = DateTime.fromISO(nextValue);
	const nextToISO = nextTo.startOf('month').toISODate() as string;

	if (nextTo > DateTime.fromISO(store.activeDate)) {
		nextStore.activeDate = nextToISO;
	}

	nextStore.to = nextToISO;

	return nextStore;
});
