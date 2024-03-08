import React from 'react';

import FoodFeed from './feed';
import FoodMain from './main';
import FoodWidgets from './widgets';

const FoodIndex = () => {
	return (
		<>
			<FoodFeed />
			<FoodMain />
			<FoodWidgets />
		</>
	);
};

export default FoodIndex;
