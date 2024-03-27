import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import ROUTES, { createLinkWithQuery as createLink } from '@routes';
import $feedStore from '@pages/feed/store';

import { SearchSelect } from '@ui';
import { Grid, Flex, Button, Text, TextField, Separator } from '@radix-ui/themes';
import { useForm } from './hooks';
import { useGetFoodEntry, useGetCategory } from '@pages/feed/views/meals-entry/hooks';

const AddMeal = () => {
	const { activeDate } = useUnit($feedStore);
	const form = useForm();
	const navigate = useNavigate();
	const [foodPresetId, setFoodPresetId] = useState('');
	const [categoryPresetId, setCategoryPresetId] = useState('');

	const foodEntryRequest = useGetFoodEntry(foodPresetId);
	const categoryRequest = useGetCategory(categoryPresetId);

	useEffect(() => {
		if (!foodPresetId) return;

		foodEntryRequest.refetch();
	}, [foodPresetId]);

	useEffect(() => {
		if (!categoryPresetId) return;

		categoryRequest.refetch();
	}, [categoryPresetId]);

	useEffect(() => {
		if (!foodEntryRequest.data) return;

		const { name, portion_weight, proteins, fats, carbs } = foodEntryRequest.data;
		const calories = (proteins + fats) * 4 + carbs * 9 * (portion_weight / 100);

		form.setValue('name', name);
		form.setValue('weight', portion_weight);
		form.setValue('proteins', proteins);
		form.setValue('fats', fats);
		form.setValue('carbs', carbs);
		form.setValue('calories', calories);
	}, [foodEntryRequest.data]);

	useEffect(() => {
		if (!categoryRequest.data) return;

		const values = form.getValues();
		const { name, color, icon } = categoryRequest.data;

		if (!values.name) {
			form.setValue('name', name);
		}

		form.setValue('icon', icon);
		form.setValue('color', color);
	}, [categoryRequest.data]);

	const onFoodPresetChangeHd = (value: Record<string, string>) => {
		setFoodPresetId(value.id);
	};

	const onCategoryPresetChangeHd = (value: Record<string, string>) => {
		setCategoryPresetId(value.id);
	};

	const navToList = (e) => {
		e.preventDefault();

		const link = createLink(ROUTES.CONTENT.FEED, {
			date: activeDate
		});

		navigate(link);
	};

	const onSubmit = () => {
		const values = form.getValues();

		if (values.consumed_at) {
			const [hours, minutes] = values.consumed_at.split(':');

			values.consumed_at = DateTime.local()
				.set({
					hour: Number.parseInt(hours, 10),
					minute: Number.parseInt(minutes, 10),
					second: 0
				})
				.toISO();
		} else {
			delete values.consumed_at;
		}

		values.proteins = Number.parseFloat(`${values.proteins}`);
		values.fats = Number.parseFloat(`${values.fats}`);
		values.carbs = Number.parseFloat(`${values.carbs}`);
		values.weight = Number.parseFloat(`${values.weight}`);

		console.log(values);
	};

	return (
		<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Grid gap="3">
				<Grid flow="column" columns="1fr" gap="3">
					<label htmlFor="meal_name">
						<Text size="2" mb="1" weight="bold">
							Title
						</Text>
						<TextField.Input id="meal_name" placeholder="Delicious meal" {...form.name} />
					</label>
				</Grid>

				<Separator size="4" />

				<Grid flow="column" columns="1fr 1fr 1fr" gap="3">
					<label htmlFor="meal_icon">
						<Text size="2" mb="1" weight="bold">
							Icon
						</Text>
						<TextField.Input id="meal_icon" placeholder="🍏" {...form.icon} />
					</label>

					<label htmlFor="meal_color">
						<Text size="2" mb="1" weight="bold">
							Icon
						</Text>
						{/* @todo: moove color picker as separate component */}
						<TextField.Input type="color" id="meal_color" placeholder="#123ABC" {...form.color} />
					</label>

					<label htmlFor="meal_consumed_at">
						<Text size="2" mb="1" weight="bold">
							Date
						</Text>
						<TextField.Input id="meal_consumed_at" type="time" {...form.consumed_at} />
					</label>
				</Grid>

				<Separator size="4" />

				<Grid flow="column" columns="1fr 1fr" gap="3">
					<label htmlFor="category_preset">
						<Text size="2" mb="1" weight="bold" as="div">
							Category Preset
						</Text>

						<SearchSelect endpoint="/categories/search" onChange={onCategoryPresetChangeHd} />
					</label>

					<label htmlFor="food_preset">
						<Text size="2" mb="1" weight="bold" as="div">
							Food preset
						</Text>

						<SearchSelect endpoint="/food/search" onChange={onFoodPresetChangeHd} />
					</label>
				</Grid>

				<Separator size="4" />

				<Grid flow="column" columns="1fr 1fr 1fr" gap="3">
					<label htmlFor="proteins">
						<Text size="2" mb="1" weight="bold">
							Proteins
						</Text>
						<TextField.Input id="proteins" type="number" placeholder="50" {...form.proteins} />
					</label>

					<label htmlFor="fats">
						<Text size="2" mb="1" weight="bold">
							Fats
						</Text>
						<TextField.Input id="fats" type="number" placeholder="50" {...form.fats} />
					</label>

					<label htmlFor="carbs">
						<Text size="2" mb="1" weight="bold">
							Carbs
						</Text>
						<TextField.Input id="carbs" type="number" placeholder="100" {...form.carbs} />
					</label>
				</Grid>

				<Grid flow="column" columns="2fr 1fr" gap="3">
					<label htmlFor="weight">
						<Text size="2" mb="1" weight="bold">
							Portion Weight
						</Text>
						<TextField.Input id="weight" type="number" placeholder="500" {...form.weight} />
					</label>

					<label htmlFor="calories">
						<Text size="2" mb="1" weight="bold">
							Calories
						</Text>
						<TextField.Input id="calories" type="number" placeholder="900" {...form.calories} />
					</label>
				</Grid>
			</Grid>

			<Grid flow="column" columns="1fr 2fr" mt="4" gap="4">
				<Button size="3" variant="soft" color="gray" onClick={navToList} type="reset">
					Cancel
				</Button>

				<Button size="3" variant="soft" type="submit">
					Save
				</Button>
			</Grid>
		</form>
	);
};

export default AddMeal;
