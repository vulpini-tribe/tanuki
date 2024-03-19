import React, { useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { DateTime } from 'luxon';

import { $calendarStore, dayDataSelector } from '../store';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Grid, Box, Heading, Badge, Tooltip, Text, Avatar } from '@radix-ui/themes';

import { SharedMain } from '../../shared';
import { useGetHistoryEntry } from './hooks';
import { FoodRow } from './main.styles';

const useDate = (date: string) => {
	const today = DateTime.local();
	const day = DateTime.fromISO(date);

	if (day.get('year') === today.get('year')) {
		return day.toFormat('MMMM d');
	}

	return day.toFormat('MMMM d, yyyy');
};

const CalendarMain = () => {
	const dayData = useStoreMap($calendarStore, dayDataSelector);

	const getEntryReq = useGetHistoryEntry(dayData.id);
	const formattedDay = useDate(dayData.day);

	const foodEntries = dayData.consumed_food || [];

	useEffect(() => {
		if (!dayData.id) return;

		getEntryReq.refetch();
	}, [dayData.id]);

	return (
		<SharedMain>
			<Heading mb="4">{formattedDay}</Heading>

			{foodEntries.map((food) => {
				const protein = (food.protein_100 * (food.portion_weight / 100)).toFixed(0);
				const fat = (food.fat_100 * (food.portion_weight / 100)).toFixed(0);
				const carbs = (food.carbs_100 * (food.portion_weight / 100)).toFixed(0);
				const totalCalories = (food.kcal_100 * (food.portion_weight / 100)).toFixed(0);

				return (
					<Grid key={food.id} asChild p="3">
						<FoodRow>
							<Grid flow="column" columns="min-content 1fr" gap="3">
								<Tooltip content={food.category.name}>
									<Box>
										<Avatar
											size="4"
											style={{ border: `2px solid ${food.category.color}` }}
											fallback={food.category.icon}
											radius="full"
										/>
									</Box>
								</Tooltip>

								<Grid flow="row" gap="2">
									<Grid flow="column" columns="1fr max-content" gap="2">
										<Text size="3">{food.name}</Text>

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
														<Text size="2">{food.portion_weight}</Text>&thinsp;<Text size="1">g</Text>
													</Box>
												</Badge>
											</Tooltip>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</FoodRow>
					</Grid>
				);
			})}

			<Grid flow="column" columns="1fr" mt="4">
				<Button size="3" variant="soft">
					<PlusIcon width="24" height="24" /> Add Meal
				</Button>
			</Grid>
		</SharedMain>
	);
};

export default CalendarMain;
