import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';

import { SharedMain } from '../../shared';
import { useGetHistoryEntry } from './hooks';

const CalendarMain = ({ id }) => {
	const getEntryReq = useGetHistoryEntry(id);

	useEffect(() => {
		if (!id) return;

		getEntryReq.refetch();
	}, [id]);

	return (
		<SharedMain>
			<div>{id}</div>

			<NavLink to={ROUTES.CONTENT.FEED}>Back</NavLink>
		</SharedMain>
	);
};

export default CalendarMain;
