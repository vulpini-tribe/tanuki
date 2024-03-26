export type Props = {
	onChange: (value: SearchEntry) => void;
	labelKey: string;
	valueKey: string;
	endpoint: string;
	initValue: SearchEntry;
};

export type SearchEntry = Record<string, string>;

export type SearchResponse = {
	data: SearchEntry[];
};
