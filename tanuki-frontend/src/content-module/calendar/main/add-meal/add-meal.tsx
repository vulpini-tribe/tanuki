import React from 'react';

import { SearchSelect } from '@ui';
import { Grid, Flex, Button, Dialog, Text, TextField, Separator } from '@radix-ui/themes';
import { useForm } from './hooks';

const AddMeal = ({ setIsModalOpen }) => {
	const form = useForm();

	const onSubmit = () => {
		const values = form.getValues();

		console.log(values);
	};

	return (
		<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Grid gap="3">
				<Grid flow="column" columns="2fr 1fr" gap="3">
					<label htmlFor="meal_name">
						<Text size="2" mb="1" weight="bold">
							Title
						</Text>
						<TextField.Input id="meal_name" placeholder="Delicious meal" {...form.name} />
					</label>

					<label htmlFor="meal_icon">
						<Text size="2" mb="1" weight="bold">
							Icon
						</Text>
						<TextField.Input id="meal_icon" placeholder="🍏" {...form.icon} />
					</label>
				</Grid>

				<Separator size="4" />

				<Grid flow="column" columns="1fr 1fr" gap="3">
					<label>
						<Text size="2" mb="1" weight="bold" as="div">
							Category
						</Text>

						{/* <SearchSelect /> */}
					</label>

					<label>
						<Text size="2" mb="1" weight="bold" as="div">
							Food preset
						</Text>

						<SearchSelect />
					</label>
				</Grid>
				<Separator size="4" />

				<Grid flow="column" columns="1fr 1fr 1fr" gap="3">
					<label htmlFor="proteins">
						<Text size="2" mb="1" weight="bold">
							Proteins in 100
						</Text>
						<TextField.Input id="proteins" placeholder="50" {...form.proteins} />
					</label>

					<label htmlFor="fats">
						<Text size="2" mb="1" weight="bold">
							Fats in 100
						</Text>
						<TextField.Input id="fats" placeholder="50" {...form.fats} />
					</label>

					<label htmlFor="carbs">
						<Text size="2" mb="1" weight="bold">
							Carbs in 100
						</Text>
						<TextField.Input id="carbs" placeholder="100" {...form.carbs} />
					</label>
				</Grid>

				<Grid flow="column" columns="2fr 1fr" gap="3">
					<label htmlFor="weight">
						<Text size="2" mb="1" weight="bold">
							Portion Weight
						</Text>
						<TextField.Input id="weight" placeholder="500" {...form.weight} />
					</label>

					<label htmlFor="calories">
						<Text size="2" mb="1" weight="bold">
							Calories
						</Text>
						<TextField.Input id="calories" placeholder="900" {...form.calories} />
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
