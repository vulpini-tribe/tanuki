import React from 'react';

import { Flex, Button, Grid, Text, Checkbox } from '@radix-ui/themes';

import { PersonalTab } from './tabs';
import Root, { TabsActions } from './sign-up.styles';

import useSignUp from './hooks';

const SignUpPage = () => {
	const { form, request } = useSignUp();
	const [isRead, setIsRead] = React.useState(false);

	const onSubmit = (data: unknown) => {
		request.fetch();
	};

	const isDisabled = !isRead || !form.isValid;

	return (
		<Root method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Grid flow="row" gap="6">
				<PersonalTab form={form} />

				<Grid flow="column" gap="3" asChild>
					<TabsActions>
						<Text as="label" size="2">
							<Flex gap="2">
								<Checkbox checked={isRead} onCheckedChange={setIsRead} /> Agree to Terms and Conditions
							</Flex>
						</Text>

						<Button type="submit" size="2" disabled={isDisabled}>
							Register
						</Button>
					</TabsActions>
				</Grid>
			</Grid>
		</Root>
	);
};

export default SignUpPage;
