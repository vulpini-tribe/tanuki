import { createEvent, createStore } from 'effector';

type AuthStore = {
	isAuthorized: boolean;
};

export const toggleAuth = createEvent<AuthStore['isAuthorized']>();
export const $authStore = createStore<AuthStore>({
	isAuthorized: window.localStorage.getItem('isAuthorized') === 'true' ? true : false
});

$authStore.on(toggleAuth, (store, nextValue) => {
	const newStore = { ...store };

	newStore.isAuthorized = nextValue;
	window.localStorage.setItem('isAuthorized', nextValue.toString());

	return newStore;
});
