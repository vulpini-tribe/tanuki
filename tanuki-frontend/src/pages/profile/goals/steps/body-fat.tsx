import React from 'react';

import { Grid, Heading, RadioCards, Text, Flex } from '@radix-ui/themes';

const BodyFat = () => {
	return (
		<Grid mt="5">
			<Heading>What is your body fat level?</Heading>

			<RadioCards.Root defaultValue="essential" columns={{ initial: '1', sm: '3' }}>
				<RadioCards.Item value="essential">
					<Flex direction="column">
						<Text weight="bold">Essential</Text>
						<Text>10% - 13%</Text>
						{/* 2-5 */}
					</Flex>
				</RadioCards.Item>

				<RadioCards.Item value="athletic">
					<Flex direction="column">
						<Text weight="bold">Athletes</Text>
						<Text>14% - 20%</Text>
					</Flex>
					{/* 6-13 */}
				</RadioCards.Item>

				<RadioCards.Item value="fitness">
					<Flex direction="column">
						<Text weight="bold">Fitness</Text>
						<Text>21% - 24%</Text>
					</Flex>
					{/* 14 - 17 */}
				</RadioCards.Item>

				<RadioCards.Item value="average">
					<Flex direction="column">
						<Text weight="bold">Average</Text>
						<Text>25% - 31%</Text>
					</Flex>
					{/* 18 - 24 */}
				</RadioCards.Item>

				<RadioCards.Item value="obese">
					<Flex direction="column">
						<Text weight="bold">Obese</Text>
						<Text>32%+</Text>
					</Flex>
					{/* 25+ */}
				</RadioCards.Item>
			</RadioCards.Root>
		</Grid>
	);
};

export default BodyFat;
