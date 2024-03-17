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
	// activeDate === today
	DateTime.fromISO(today).minus({ days: 180 }) < DateTime.fromISO(activeDate)
		? DateTime.fromISO(activeDate).minus({ days: 180 }).startOf('month')
		: DateTime.fromISO(activeDate).startOf('month');

type PartialHistoryEntry = {
	id: string;
	day: string;
	weight: number;
	calories: number;
};

type CalendarStore = {
	from: string;
	to: string;
	activeDate: string;
	allHistoryEntries: PartialHistoryEntry[];
};

export const setFrom = createEvent<CalendarStore['from']>();
export const setTo = createEvent<CalendarStore['to']>();

export const $calendarStore = createStore<CalendarStore>({
	from: today,
	to: toDate.toISODate() as string,
	activeDate,
	allHistoryEntries: []
});

$calendarStore.on(setFrom, (store, nextValue) => {
	const nextStore = { ...store };
	nextStore.from = nextValue;
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
