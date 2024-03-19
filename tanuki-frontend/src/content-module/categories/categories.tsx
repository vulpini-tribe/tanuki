import React, { useState, useEffect } from 'react';
import { useForm, useAddCategory } from './hooks';
import { Grid, Box, Heading, Button, Dialog, TextField, Flex, Text, TextArea } from '@radix-ui/themes';

const Categories = () => {
	const [formValues, setFormValues] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const form = useForm();
	const request = useAddCategory(formValues);

	const onSubmit = () => {
		const values = form.getValues();

		setFormValues(values);
	};

	useEffect(() => {
		if (Object.keys(formValues).length === 0) return;

		request.refetch();
		setIsModalOpen(false);
	}, [formValues]);

	return (
		<Grid flow="row" rows="min-content">
			<Heading>Categories</Heading>

			<Box>
				<Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
					<Dialog.Trigger>
						<Button>Add category</Button>
					</Dialog.Trigger>

					<Dialog.Content>
						<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
							<Dialog.Title>Add Category</Dialog.Title>

							<Dialog.Description size="2" mb="4">
								Add custom category
							</Dialog.Description>

							<Flex direction="column" gap="3">
								<label>
									<Text as="div" size="2" mb="1" weight="bold">
										Name
									</Text>
									<TextField.Input placeholder="Baked" {...form.name} />
								</label>

								<label>
									<Text as="div" size="2" mb="1" weight="bold">
										Description
									</Text>
									<TextArea size="2" placeholder="Some baked stuff such as bread or loaf" {...form.description} />
								</label>

								<Grid flow="column" columns="1fr 1fr" gap="3">
									<label>
										<Text as="div" size="2" mb="1" weight="bold">
											Color
										</Text>
										<TextField.Input placeholder="#333fff" {...form.color} />
									</label>

									<label>
										<Text as="div" size="2" mb="1" weight="bold">
											Icon
										</Text>
										<TextField.Input placeholder="🍏" {...form.icon} />
									</label>
								</Grid>
							</Flex>

							<Flex gap="3" mt="4" justify="end">
								<Dialog.Close>
									<Button variant="soft" color="gray">
										Cancel
									</Button>
								</Dialog.Close>

								<Button type="submit">Save</Button>
							</Flex>
						</form>
					</Dialog.Content>
				</Dialog.Root>
			</Box>
		</Grid>
	);
};

export default Categories;
