import React, { useEffect, useState } from 'react';

import { SearchSelect } from '@ui';
import { Grid, Flex, Button, Dialog, Text, TextField, Separator } from '@radix-ui/themes';
import { useForm } from './hooks';
import { useGetFoodEntry, useGetCategory } from '@pages/feed/views/main/hooks';

const AddMeal = ({ setIsModalOpen }) => {
	const form = useForm();
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

		const { kcal_100, name, portion_weight, protein_100, fat_100, carbs_100 } = foodEntryRequest.data;

		form.setValue('calories', kcal_100);
		form.setValue('name', name);
		form.setValue('weight', portion_weight);
		form.setValue('proteins', protein_100);
		form.setValue('fats', fat_100);
		form.setValue('carbs', carbs_100);
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
		console.log('onCategoryPresetChangeHd');
		setCategoryPresetId(value.id);
	};

	const onSubmit = () => {
		const values = form.getValues();

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

				<Grid flow="column" columns="1fr 1fr" gap="3">
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

			<Flex gap="3" mt="4" justify="end">
				<Dialog.Close>
					<Button variant="soft" color="gray">
						Cancel
					</Button>
				</Dialog.Close>

				<Button type="submit">Save</Button>
			</Flex>
		</form>
	);
};

export default AddMeal;
