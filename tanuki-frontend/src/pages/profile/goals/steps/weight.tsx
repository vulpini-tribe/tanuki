import React from 'react';

import { Grid, Box, Heading, TextField } from '@radix-ui/themes';

const Weight = () => {
	return (
		<Grid mt="5">
			<Heading>What is your weight?</Heading>

			<Box mt="5">
				<Grid flow="column" columns="30% min-content" align="center" justify="center" gap="3">
					<TextField.Root size="3" type="number" min={4} max={7} />
					<Heading>lbs</Heading>
				</Grid>

				<Grid flow="column" columns="30% min-content" align="center" justify="center" gap="3">
					<TextField.Root size="3" type="number" min={100} max={250} />
					<Heading>kg</Heading>
				</Grid>
			</Box>
		</Grid>
	);
};

export default Weight;
