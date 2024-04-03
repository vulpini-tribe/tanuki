import React from 'react';

import { Grid, Box, Heading, RadioCards, Text } from '@radix-ui/themes';

const CaloriesFloor = () => {
	return (
		<Grid mt="5">
			<Heading>What calorie floor do you prefer?</Heading>

			<Box mt="5">
				<RadioCards.Root defaultValue="standard" columns={{ initial: '1', sm: '3' }}>
					<RadioCards.Item value="standard">
						<Text weight="bold">Standard</Text>
					</RadioCards.Item>

					<RadioCards.Item value="aggressive">
						<Text weight="bold">Aggressive</Text>
					</RadioCards.Item>
				</RadioCards.Root>
			</Box>
		</Grid>
	);
};

export default CaloriesFloor;
