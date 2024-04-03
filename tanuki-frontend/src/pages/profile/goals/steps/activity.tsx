import React from 'react';

import { Grid, Box, Heading, RadioCards, Flex, Text } from '@radix-ui/themes';

const Activity = () => {
	return (
		<Grid mt="5">
			<Heading>How active are you?</Heading>

			<Box mt="5">
				<RadioCards.Root defaultValue="passive" columns={{ initial: '1', sm: '3' }}>
					<RadioCards.Item value="passive">
						<Flex direction="column">
							<Text weight="bold">Passive lifestyle</Text>
							<Text>0-2000 steps per day</Text>
						</Flex>
					</RadioCards.Item>

					<RadioCards.Item value="little">
						<Flex direction="column">
							<Text weight="bold">Little activity</Text>
							<Text>2000-5000 steps per day</Text>
						</Flex>
					</RadioCards.Item>

					<RadioCards.Item value="moderate">
						<Flex direction="column">
							<Text weight="bold">Moderate activity</Text>
							<Text>5000-8000 steps per day</Text>
						</Flex>
					</RadioCards.Item>

					<RadioCards.Item value="high">
						<Flex direction="column">
							<Text weight="bold">High activity</Text>
							<Text>8000-15000 steps per day</Text>
						</Flex>
					</RadioCards.Item>

					<RadioCards.Item value="extreme">
						<Flex direction="column">
							<Text weight="bold">Extreme Activity</Text>
							<Text>15000+ steps per day</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>
			</Box>
		</Grid>
	);
};

export default Activity;
