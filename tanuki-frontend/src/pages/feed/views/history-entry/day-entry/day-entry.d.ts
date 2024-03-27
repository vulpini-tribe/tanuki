import { DateTime } from 'luxon';

export type StyledRootProps = { $fromNextMonth?: boolean; $isToday?: boolean };

export type Props = {
	day: DateTime;
	firstDayOfMonth: DateTime;
};
