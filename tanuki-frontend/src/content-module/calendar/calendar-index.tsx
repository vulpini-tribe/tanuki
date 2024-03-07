import React from 'react';

import CalendarFeed from './feed';
import CalendarMain from './main';
import CalendarWidgets from './widgets';

const CalendarIndex = () => {
	return (
		<>
			<CalendarFeed />
			<CalendarMain />
			<CalendarWidgets />
		</>
	);
};

export default CalendarIndex;
