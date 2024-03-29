export type MealEntryT = {
	id: string;
	name: string;
	carbs: number;
	fats: number;
	weight: number;
	proteins: number;
	icon: string;
	color: string;
	created_at: unknown;
};

export type FullHistoryEntryT = {
	id: string;
	day: string;
	calories: number;
	max_calories: number;
	meals: MealEntryT[];
};

export type FeedStoreT = {
	activeDate: string;
	fullHistoryEntries: Record<string, FullHistoryEntryT>;
};
