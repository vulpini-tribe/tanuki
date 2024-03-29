import { DateTime } from 'luxon';

export type Props = {
	monthKey: string;
	month: Record<string, DateTime[]>;
};
