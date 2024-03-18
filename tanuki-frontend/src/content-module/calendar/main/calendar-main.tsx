import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useStoreMap } from 'effector-react';

import ROUTES from '@routes';
import { $calendarStore } from '../store';

import { SharedMain } from '../../shared';
import { useGetHistoryEntry } from './hooks';

const CalendarMain = () => {
	const dayData = useStoreMap($calendarStore, ({ activeDate, allHistoryEntries, fullHistoryEntries }) => {
		const partialDayData = allHistoryEntries[activeDate] || {};
		const fullDayData = fullHistoryEntries[partialDayData.id] || {};

		return {
			...partialDayData,
			...fullDayData
		};
	});

	const getEntryReq = useGetHistoryEntry(dayData.id);

	useEffect(() => {
		if (!dayData.id) return;

		getEntryReq.refetch();
	}, [dayData.id]);

	console.log(dayData);
	return (
		<SharedMain>
			<div>{dayData.id}</div>

			<NavLink to={ROUTES.CONTENT.FEED}>Back</NavLink>
		</SharedMain>
	);
};

export default CalendarMain;
