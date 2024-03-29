import React, { useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { DateTime } from 'luxon';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';

import $feedStore, { dayDataSelector } from '@pages/feed/store';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Box, Grid, Heading, ScrollArea } from '@radix-ui/themes';

import { useGetHistoryEntry } from './hooks';
import FoodEntry from './food-entry';

import type { MealEntryT } from '@pages/feed/types.d';
import AddMeal from './add-meal';
import Root from './meals-entry.styles';

const useDate = (date: string) => {
	const day = DateTime.fromISO(date);
	const today = DateTime.local();

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

const MealsList = () => {
	const test: Record<LabelsEnum, MealEntryT[]> = {
		breakfast: [],
		branch: [],
		lunch: [],
		snack: [],
		dinner: []
	};

	const dayData = useStoreMap($feedStore, dayDataSelector);
	const foodEntries = dayData.meals || [];

	const splittedFoodEntries = foodEntries.reduce((acc, food: MealEntryT) => {
		const hour = (food.created_at as DateTime).get('hour');

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
		<>
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
		</>
	);
};

const CalendarMain = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const mode = searchParams.get('mode');

	const dayData = useStoreMap($feedStore, dayDataSelector);

	const getEntryReq = useGetHistoryEntry(dayData.day);
	const formattedDay = useDate(dayData.day);

	useEffect(() => {
		if (!dayData.day) return;

		getEntryReq.refetch();
	}, [dayData.day]);

	const toEditMode = () => {
		const link = createLink(ROUTES.CONTENT.FEED, {
			date: dayData.day,
			mode: 'add'
		});

		navigate(link);
	};

	return (
		<Root>
			<Heading mb="2">{`${formattedDay} ${mode === 'add' ? ' — Add Meal' : ''}`.trim()}</Heading>

			<ScrollArea scrollbars="vertical" style={{ height: 'calc(100% - 40px)' }}>
				<Box pt="2">
					{!mode && <MealsList />}

					{mode === 'add' && <AddMeal />}

					{!mode && (
						<Grid flow="column" columns="1fr" mt="4">
							<Button size="3" variant="soft" onClick={toEditMode}>
								<PlusIcon width="24" height="24" /> Add Meal
							</Button>
						</Grid>
					)}
				</Box>
			</ScrollArea>
		</Root>
	);
};

export default CalendarMain;
