import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import ROUTES from '@routes';

import { SharedMain } from '../../shared';

const CalendarMain = () => {
	const [searchParams] = useSearchParams();

	return (
		<SharedMain>
			<div>{searchParams.get('date')}</div>

			<NavLink to={ROUTES.CONTENT.FEED}>Back</NavLink>
		</SharedMain>
	);
};

export default CalendarMain;
