import React, { useRef } from 'react';
import { useUnit } from 'effector-react';
import { DateTime } from 'luxon';

import $feedStore, { setActiveDate } from '@pages/feed/store';

import { Heading } from '@radix-ui/themes';
import Root from './date-picker.styles';

const useDate = (date: string) => {
	const day = DateTime.fromISO(date);
	const today = DateTime.local();

	if (day.get('year') === today.get('year')) {
		return day.toFormat('MMMM d');
	}

	return day.toFormat('MMMM d, yyyy');
};

const DatePicker = () => {
	const calendarRef = useRef<HTMLInputElement>(null);
	const { activeDate } = useUnit($feedStore);
	const formattedDay = useDate(activeDate);

	const showPicker = () => {
		if (!calendarRef.current) return;

		calendarRef.current.showPicker();
	};

	const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveDate(e.target.value);
	};

	return (
		<Root>
			<Heading mb="2" onClick={showPicker} role="button">
				{formattedDay}
			</Heading>

			<input ref={calendarRef} type="date" style={{ visibility: 'hidden' }} onChange={onDateChange} />
		</Root>
	);
};

export default DatePicker;
