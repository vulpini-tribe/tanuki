import React, { useRef } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

import $feedStore, { setActiveDate } from '@pages/feed/store';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';

import { Heading } from '@radix-ui/themes';
import { CalendarIcon } from '@radix-ui/react-icons';
import Root, { DateInput } from './date-picker.styles';

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
	const navigate = useNavigate();

	const showPicker = () => {
		if (!calendarRef.current) return;

		calendarRef.current.focus();
		calendarRef.current.showPicker();
	};

	const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nextDate = e.target.value;
		setActiveDate(nextDate);

		const link = createLink(ROUTES.CONTENT.FEED, { date: nextDate });
		navigate(link);
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
