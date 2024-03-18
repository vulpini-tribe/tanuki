import React, { useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { DateTime } from 'luxon';

import { $calendarStore, dayDataSelector } from '../store';

import { Heading } from '@radix-ui/themes';

import { SharedMain } from '../../shared';
import { useGetHistoryEntry } from './hooks';

const useDate = (date: string) => {
	const today = DateTime.local();
	const day = DateTime.fromISO(date);

	if (day.get('year') === today.get('year')) {
		return day.toFormat('MMMM d');
	}

	return day.toFormat('MMMM d, yyyy');
};

const CalendarMain = () => {
	const dayData = useStoreMap($calendarStore, dayDataSelector);

	const getEntryReq = useGetHistoryEntry(dayData.id);
	const formattedDay = useDate(dayData.day);

	useEffect(() => {
		if (!dayData.id) return;

		getEntryReq.refetch();
	}, [dayData.id]);

	console.log(dayData);

	return (
		<SharedMain>
			<Heading>{formattedDay}</Heading>

			<div>Add meal</div>
		</SharedMain>
	);
};

export default CalendarMain;
