import React, { useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { DateTime } from 'luxon';

import { $calendarStore, dayDataSelector } from '../store';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Grid, Heading } from '@radix-ui/themes';

import { SharedMain } from '../../shared';
import { useGetHistoryEntry } from './hooks';
import FoodEntry from './food-entry';

import type { ConsumedFoodT } from '../store';

const useDate = (date: string) => {
	const today = DateTime.local();
	const day = DateTime.fromISO(date);

	if (day.get('year') === today.get('year')) {
		return day.toFormat('MMMM d');
	}

	return day.toFormat('MMMM d, yyyy');
};

const BRANCH_HOURS = 12;
const LUNCH_HOURS = 14;
const SNACK_HOURS = 16;
const DINNER_HOURS = 20;

const labels = {
	breakfast: 'Breakfast',
	branch: 'Branch',
	lunch: 'Lunch',
	snack: 'Snack',
	dinner: 'Dinner'
};

type LabelsEnum = keyof typeof labels;

const CalendarMain = () => {
	const test: Record<LabelsEnum, ConsumedFoodT[]> = {
		breakfast: [],
		branch: [],
		lunch: [],
		snack: [],
		dinner: []
	};

	const dayData = useStoreMap($calendarStore, dayDataSelector);

	const getEntryReq = useGetHistoryEntry(dayData.id);
	const formattedDay = useDate(dayData.day);

	const foodEntries = dayData.consumed_food || [];

	useEffect(() => {
		if (!dayData.id) return;

		getEntryReq.refetch();
	}, [dayData.id]);

	const splittedFoodEntries = foodEntries.reduce((acc, food: ConsumedFoodT) => {
		const hour = (food.datetime as DateTime).get('hour');

		if (hour >= DINNER_HOURS) {
			acc.dinner.push(food);
		} else if (hour >= SNACK_HOURS) {
			acc.snack.push(food);
		} else if (hour >= LUNCH_HOURS) {
			acc.lunch.push(food);
		} else if (hour >= BRANCH_HOURS) {
			acc.branch.push(food);
		} else {
			acc.breakfast.push(food);
		}

		return acc;
	}, test);

	return (
		<SharedMain header={formattedDay}>
			{Object.entries(splittedFoodEntries).map(([key, value]) => {
				if (!value.length) return null;

				return (
					<Grid flow="row" rows="1fr" mt="5" key={key}>
						<Heading size="4" mb="1">
							{labels[key as LabelsEnum]}
						</Heading>

						{value.map((food) => {
							return <FoodEntry key={food.id} {...food} />;
						})}
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
