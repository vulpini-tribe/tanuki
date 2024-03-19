import React, { useMemo } from 'react';

import { Grid, Box, Badge, Tooltip, Text, Avatar } from '@radix-ui/themes';
import Root from './food-entry.styles';

import type { ConsumedFoodT } from '../../store';

type Props = ConsumedFoodT;

const FoodEntry = ({ name, category, protein_100, fat_100, carbs_100, kcal_100, portion_weight }: Props) => {
	const protein = useMemo(() => {
		return (protein_100 * (portion_weight / 100)).toFixed(0);
	}, [protein_100, portion_weight]);

	const fat = useMemo(() => {
		return (fat_100 * (portion_weight / 100)).toFixed(0);
	}, [fat_100, portion_weight]);

	const carbs = useMemo(() => {
		return (carbs_100 * (portion_weight / 100)).toFixed(0);
	}, [carbs_100, portion_weight]);

	const totalCalories = useMemo(() => {
		return (kcal_100 * (portion_weight / 100)).toFixed(0);
	}, [kcal_100, portion_weight]);

	return (
		<Grid asChild p="3">
			<Root>
				<Grid flow="column" columns="min-content 1fr" gap="3">
					<Tooltip content={category.name}>
						<Box>
							<Avatar
								size="4"
								style={{ border: `2px solid ${category.color}` }}
								fallback={category.icon}
								radius="full"
							/>
						</Box>
					</Tooltip>

					<Grid flow="row" gap="2">
						<Grid flow="column" columns="1fr max-content" gap="2">
							<Text size="3">{name}</Text>

							<Grid flow="column" columns="min-content" gap="1" align="end">
								<Text size="2">{totalCalories}</Text>
								<Text size="1">kcal</Text>
							</Grid>
						</Grid>

						<Grid flow="column" columns="min-content min-content min-content 1fr" gap="2">
							<Tooltip content="Proteins">
								<Badge size="1" color="violet">
									<Box>
										<Text size="2">{protein}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Tooltip content="Fats">
								<Badge size="1" color="amber">
									<Box>
										<Text size="2">{fat}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Tooltip content="Carbs">
								<Badge size="1" color="blue">
									<Box>
										<Text size="2">{carbs}</Text>&thinsp;<Text size="1">g</Text>
									</Box>
								</Badge>
							</Tooltip>

							<Box ml="auto">
								<Tooltip content="Portion Weight">
									<Badge size="1" color="green">
										<Box>
											<Text size="2">{portion_weight}</Text>&thinsp;<Text size="1">g</Text>
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

export default React.memo(FoodEntry);
