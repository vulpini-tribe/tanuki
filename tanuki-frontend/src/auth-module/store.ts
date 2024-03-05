import { createEvent, createStore } from 'effector';

export const toggleAuth = createEvent();
export const $authStore = createStore({ isAuthorized: false });

$authStore.on(toggleAuth, (store, nextValue) => {
	const newStore = { ...store };

	newStore.isAuthorized = nextValue;

	return newStore;
});
