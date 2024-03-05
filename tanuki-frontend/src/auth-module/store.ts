import { createEvent, createStore, createEffect } from 'effector';

export const toggleAuth = createEvent();
export const setUserId = createEvent();

export const $authStore = createStore({ isAuthorized: false, userId: undefined });

$authStore.on(toggleAuth, (store, nextValue) => {
	const newStore = { ...store };

	newStore.isAuthorized = nextValue;

	return newStore;
});

$authStore.on(setUserId, (store, userId) => {
	const newStore = { ...store };

	window.localStorage.setItem('user_id', userId);
	newStore.userId = userId;

	return newStore;
});
