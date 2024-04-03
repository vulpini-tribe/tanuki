import React from 'react';

import { Grid, Box, Heading, TextField } from '@radix-ui/themes';

const TargetWeight = () => {
	return (
		<Grid mt="5">
			<Heading>What is your target weight?</Heading>

			<Box mt="5">
				<TextField.Root size="3" type="number" min={4} max={7} />
				<Heading>lbs</Heading>

				<TextField.Root size="3" type="number" min={100} max={250} />
				<Heading>kg</Heading>
			</Box>
		</Grid>
	);
};

export default TargetWeight;
