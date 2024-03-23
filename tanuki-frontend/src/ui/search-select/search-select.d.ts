export type Props = {
	onChange: (value: unknown) => void;
	labelKey: string;
	valueKey: string;
};

export type SearchEntry = Record<string, string>;

export type SearchResponse = {
	data: SearchEntry[];
};
