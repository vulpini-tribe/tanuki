import React from 'react';

import { Grid, Box, Heading, TextField, RadioCards, Flex, Text } from '@radix-ui/themes';

const Height = () => {
	return (
		<Grid mt="5">
			<Heading>What is your Height?</Heading>

			<Box mt="5">
				<RadioCards.Root defaultValue="metric" columns={{ initial: '2' }}>
					<RadioCards.Item value="metric">
						<Flex direction="column">
							<Text weight="bold">Metric</Text>
						</Flex>
					</RadioCards.Item>

					<RadioCards.Item value="retarded">
						<Flex direction="column">
							<Text weight="bold">Imperial</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>

				<TextField.Root size="3" type="number" min={4} max={7} />
				<Heading>ft</Heading>
				<TextField.Root size="3" type="number" min={0} max={11} />
				<Heading>in</Heading>

				<TextField.Root size="3" type="number" min={100} max={250} />
				<Heading>cm</Heading>
			</Box>
		</Grid>
	);
};

export default Height;
