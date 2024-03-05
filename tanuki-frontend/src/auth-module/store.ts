import { createEvent, createStore, createEffect } from 'effector';

export const toggleAuth = createEvent();
export const setUserId = createEvent();
export const deleteUserId = createEvent();

export const $authStore = createStore({ isAuthorized: false, userId: undefined });

$authStore.on(toggleAuth, (store, nextValue) => {
	const newStore = { ...store };

	newStore.isAuthorized = nextValue;

	return newStore;
});

$authStore.on(setUserId, (store, userId) => {
	const newStore = { ...store };

	newStore.userId = userId;
	window.localStorage.setItem('user_id', userId);

	return newStore;
});

$authStore.on(deleteUserId, (store) => {
	const newStore = { ...store };

	newStore.isAuthorized = false;
	newStore.userId = undefined;
	window.localStorage.removeItem('user_id');

	return newStore;
});
