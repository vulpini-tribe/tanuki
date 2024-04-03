import React from 'react';

import { Grid, Heading, RadioCards, Text } from '@radix-ui/themes';

const Sex = () => {
	return (
		<Grid mt="5">
			<Heading>What is your hormonal sex?</Heading>

			<RadioCards.Root defaultValue="female" columns={{ initial: '1', sm: '2' }}>
				<RadioCards.Item value="female">
					<Text weight="bold">Female</Text>
				</RadioCards.Item>

				<RadioCards.Item value="male">
					<Text weight="bold">Male</Text>
				</RadioCards.Item>
			</RadioCards.Root>
		</Grid>
	);
};

export default Sex;
