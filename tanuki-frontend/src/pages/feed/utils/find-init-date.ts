import QS from 'qs';
import { DateTime } from 'luxon';

import { MIN_DATE } from '../constants';

const find_init_date = () => {
	const today = DateTime.local().toISODate();
	const minimalDate = DateTime.fromISO(MIN_DATE);

	const parsedDate = QS.parse(location.search, { ignoreQueryPrefix: true }).date as string;
	let activeDate = DateTime.fromISO(parsedDate).isValid ? parsedDate : today;
	activeDate = DateTime.fromISO(activeDate) < minimalDate ? MIN_DATE : activeDate;

	return activeDate;
};

export default find_init_date;
