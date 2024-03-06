import { createEvent, createStore } from 'effector';

type ProfileStore = {
	id: string;
	email: string;
	avatar_url: string;
	nickname: string;
	units: 'metric' | 'retarded';
	language: string;
	theme: 'dark' | 'light' | 'auto';
	mode: 'loss' | 'gain' | 'maintain'; // weight mode
};

const defaultProfile: ProfileStore = {
	id: '',
	email: '',
	avatar_url: '',
	nickname: '',
	units: 'metric',
	language: 'en-US',
	theme: 'light',
	mode: 'loss'
};

export const setProfile = createEvent<ProfileStore>();
export const clearProfile = createEvent();

export const $profileStore = createStore<ProfileStore>(defaultProfile);

$profileStore.on(setProfile, (store, nextValue) => {
	return {
		...store,
		...nextValue
	};
});

$profileStore.on(clearProfile, () => defaultProfile);
