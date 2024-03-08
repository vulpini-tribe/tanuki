import { DateTime } from 'luxon';
import { createEvent, createStore } from 'effector';

export type WeightEntry = {
	date: DateTime;
	weight: number;
};

type WeightGraphStore = {
	history: WeightEntry[];
};

export const setWeightGraph = createEvent<WeightGraphStore['history']>();
export const $weightGraphStore = createStore<WeightGraphStore>({
	history: []
});

$weightGraphStore.on(setWeightGraph, (store, nextValue) => {
	const nextStore = { ...store };

	nextStore.history = nextValue;

	return { ...nextStore };
});
