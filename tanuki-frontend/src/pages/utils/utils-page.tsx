import React from 'react';

import BmiCalc from './bmi-calc';
import CaloriesCalc from './calories-calc';

import Root from './utils-page.styles';

const UtilsPage = () => {
	return (
		<Root>
			<BmiCalc />
			<CaloriesCalc />
		</Root>
	);
};

export default UtilsPage;
