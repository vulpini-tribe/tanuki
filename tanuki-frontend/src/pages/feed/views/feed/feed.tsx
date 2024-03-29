import React from 'react';
import { useStoreMap } from 'effector-react';
import { DateTime } from 'luxon';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';

import $feedStore, { dayDataSelector } from '@pages/feed/store';

import { PlusIcon } from '@radix-ui/react-icons';
import { IconButton, Grid, Heading } from '@radix-ui/themes';

import FoodEntry from './food-entry';

import type { MealEntryT } from '@pages/feed/types.d';
import AddMeal from './add-meal';

import Root, { AddBtn } from './feed.styles';

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

const AddMealBtn = () => {
	const navigate = useNavigate();
	const dayData = useStoreMap($feedStore, dayDataSelector);

	const toEditMode = () => {
		const link = createLink(ROUTES.CONTENT.FEED, {
			date: dayData.day,
			mode: 'add'
		});

		navigate(link);
	};

	return (
		<AddBtn>
			<IconButton size="3" variant="solid" onClick={toEditMode}>
				<PlusIcon width="24" height="24" />
			</IconButton>
		</AddBtn>
	);
};

const Feed = () => {
	const [searchParams] = useSearchParams();
	const mode = searchParams.get('mode');

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

	if (mode === 'add') {
		return (
			<Root>
				<AddMeal />
			</Root>
		);
	}

	return (
		<Root>
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

			<AddMealBtn />
		</Root>
	);
};

export default Feed;
