import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Button, Grid, Text, Checkbox } from '@radix-ui/themes';

import ROUTES from '@routes';
import { PersonalTab } from './tabs';
import Root, { TabsActions } from './sign-up.styles';

import useSignUp from './hooks';
import { useRegister } from '@src/auth-module';

const SignUpPage = () => {
	const { form } = useSignUp();
	const request = useRegister();
	const [isRead, setIsRead] = React.useState(false);

	const onSubmit = () => {
		const values = form.getValues();
		request.mutate(values);
	};

	const isDisabled = !isRead || !form.isValid || request.isPending;

	return (
		<Root method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Grid flow="row" gap="6">
				<Flex justify="left" mt="5">
					<Text size="2" highContrast>
						<Button asChild radius="small" variant="ghost" highContrast>
							<NavLink to={ROUTES.AUTH.SIGN_IN}>Back</NavLink>
						</Button>
					</Text>
				</Flex>

				<PersonalTab form={form} />

				<Grid flow="column" gap="3" asChild>
					<TabsActions>
						<Text as="label" size="2">
							<Flex gap="2">
								<Checkbox checked={isRead} onCheckedChange={setIsRead} /> Agree to Terms and Conditions
							</Flex>
						</Text>

						<Button type="submit" size="2" disabled={isDisabled}>
							{request.isPending ? '•••' : 'Register'}
						</Button>
					</TabsActions>
				</Grid>
			</Grid>
		</Root>
	);
};

export default SignUpPage;
