import React, { useRef } from 'react';
import { useUnit } from 'effector-react';
import { DateTime } from 'luxon';

import $feedStore, { setActiveDate } from '@pages/feed/store';

import { Heading } from '@radix-ui/themes';
import Root, { DateInput } from './date-picker.styles';
import { CalendarIcon } from '@radix-ui/react-icons';

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
		<Root onClick={showPicker} role="button">
			<Heading>{formattedDay}</Heading>

			<DateInput ref={calendarRef} type="date" onChange={onDateChange} />

			<CalendarIcon width={24} height={24} />
		</Root>
	);
};

export default DatePicker;
