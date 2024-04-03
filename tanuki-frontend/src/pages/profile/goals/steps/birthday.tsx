import React from 'react';

import { Grid, Box, Heading, TextField } from '@radix-ui/themes';

const Birthday = () => {
	return (
		<Grid mt="5">
			<Heading>When were you born?</Heading>

			<Box mt="5">
				<TextField.Root size="3" type="date" />
			</Box>
		</Grid>
	);
};

export default Birthday;
