export type PartialHistoryEntryT = {
	day: string;
};

export type MealEntryT = {
	id: string;
	name: string;
	carbs: number;
	fats: number;
	weight: number;
	proteins: number;
	icon: string;
	color: string;
	datetime: unknown;
};

export type FullHistoryEntryT = {
	id: string;
	day: string;
	calories: number;
	meals: MealEntryT[];
};

export type FeedStoreT = {
	from: string;
	to: string;
	activeDate: string;
	allHistoryEntries: Record<string, PartialHistoryEntryT>;
	fullHistoryEntries: Record<string, FullHistoryEntryT>;
};
