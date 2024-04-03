import React from 'react';

import { WheelPicker } from '@ui';
import { Grid, Heading } from '@radix-ui/themes';

// const years = Array.from({ length: 100 }, (_, i) => i + 1900);
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
// const days = Array.from({ length: 31 }, (_, i) => i + 1);

const Birthday = () => {
	return (
		<Grid mt="5">
			<Heading>When were you born?</Heading>

			{/* <WheelPicker dataList={days} /> */}
			<WheelPicker dataList={months} defaultValue={months[5]} />
			{/* <WheelPicker dataList={years} /> */}
		</Grid>
	);
};

export default Birthday;
