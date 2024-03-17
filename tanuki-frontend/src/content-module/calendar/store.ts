import { createEvent, createStore } from 'effector';

type CalendarStore = {
	from: string;
	to: string;
};

export const toggleAuth = createEvent<CalendarStore['isAuthorized']>();
export const $authStore = createStore<CalendarStore>({
	isAuthorized: window.localStorage.getItem('isAuthorized') === 'true' ? true : false
});

$authStore.on(toggleAuth, (store, nextValue) => {
	const newStore = { ...store };

	newStore.isAuthorized = nextValue;
	window.localStorage.setItem('isAuthorized', nextValue.toString());

	return newStore;
});
