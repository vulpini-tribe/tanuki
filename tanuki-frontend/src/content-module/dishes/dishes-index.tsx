import React from 'react';

import DishesFeed from './feed';
import DishesMain from './main';
import DishesWidgets from './widgets';

const DishesIndex = () => {
	return (
		<>
			<DishesFeed />
			<DishesMain />
			<DishesWidgets />
		</>
	);
};

export default DishesIndex;
