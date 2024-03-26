import QS from 'qs';
import { DateTime } from 'luxon';

import { MIN_DATE } from '../constants';

const find_init_date = () => {
	const today = DateTime.local().toISODate();
	const minimalDate = DateTime.fromISO(MIN_DATE);

	const parsedDate = QS.parse(location.search, { ignoreQueryPrefix: true }).date as string;
	let activeDate = DateTime.fromISO(parsedDate).isValid ? parsedDate : today;
	activeDate = DateTime.fromISO(activeDate) < minimalDate ? MIN_DATE : activeDate;

	const toDate =
		DateTime.fromISO(today).minus({ days: 180 }) < DateTime.fromISO(activeDate)
			? DateTime.fromISO(activeDate).minus({ days: 180 }).startOf('month')
			: DateTime.fromISO(activeDate).startOf('month');

	return {
		today,
		activeDate,
		toDate
	};
};

export default find_init_date;
