import React, { useMemo } from 'react';

import { Grid, Box, Badge, Tooltip, Text, Avatar } from '@radix-ui/themes';
import Root from './food-entry.styles';

import type { MealEntryT } from '@pages/feed/types.d';

type Props = MealEntryT;

const MealEntry = (props: Props) => {
	const protein = useMemo(() => {
		return props.proteins * (props.weight / 100);
	}, [props.proteins, props.weight]);

	const fat = useMemo(() => {
		return props.fats * (props.weight / 100);
	}, [props.fats, props.weight]);

	const carbs = useMemo(() => {
		return props.carbs * (props.weight / 100);
	}, [props.carbs, props.weight]);

	const totalCalories = useMemo(() => {
		return (protein * 4 + fat * 9 + carbs * 4).toFixed(0);
	}, [protein, fat, carbs]);

	return (
		<Grid asChild p="3">
			<Root>
				<Grid flow="column" columns="min-content 1fr" gap="3">
					<Box>
						<Avatar size="4" style={{ border: `2px solid ${props.color}` }} fallback={props.icon} radius="full" />
					</Box>

					<Grid flow="row" gap="2">
						<Grid flow="column" columns="1fr max-content" gap="2">
							<Text size="3">{props.name}</Text>

							<Grid flow="column" columns="min-content" gap="1" align="end">
								<Text size="2">{totalCalories}</Text>
								<Text size="1">kcal</Text>
							</Grid>
						</Grid>

						<Grid flow="column" columns="min-content min-content min-content 1fr" gap="2">
							<Tooltip content="Proteins">
								<Badge size="1" color="violet">
									<Box>
										<Text size="2">{protein.toFixed(0)}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Tooltip content="Fats">
								<Badge size="1" color="amber">
									<Box>
										<Text size="2">{fat.toFixed(0)}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Tooltip content="Carbs">
								<Badge size="1" color="blue">
									<Box>
										<Text size="2">{carbs.toFixed(0)}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Box ml="auto">
								<Tooltip content="Portion Weight">
									<Badge size="1" color="green">
										<Box>
											<Text size="2">{props.weight}</Text>&thinsp;<Text size="1">g</Text>
										</Box>
									</Badge>
								</Tooltip>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Root>
		</Grid>
	);
};

export default React.memo(MealEntry);
