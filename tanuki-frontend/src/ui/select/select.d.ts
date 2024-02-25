import type { Control, FieldValues } from 'react-hook-form';

export type Props = {
	name: string;
	control: Control<FieldValues>;
	values: { value: string; label: string }[];
};
