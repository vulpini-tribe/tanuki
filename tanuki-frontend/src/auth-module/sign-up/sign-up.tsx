import React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { Flex, Button, Grid, Text, Checkbox } from '@radix-ui/themes';

import { BaseTab, GoalsTab, PersonalTab } from './tabs';
import Root, { TabsList, TabsContent, TabsActions } from './sign-up.styles';

import useSignUp from './hooks';
const TABS_ORDER = ['base', 'goals', 'personal'] as const;

const SignUpPage = () => {
	const { form, request } = useSignUp();
	const [isRead, setIsRead] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState('base');

	const toTheNextTab = () => {
		const currentIndex = TABS_ORDER.indexOf(activeTab);
		const nextIndex = currentIndex + 1;
		const nextTab = TABS_ORDER[nextIndex];

		setActiveTab(nextTab);
	};

	const onSubmit = (data: unknown) => {
		request.fetch();
	};

	const isDisabled = !isRead || !form.isValid;

	return (
		<Root method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Tabs.Root value={activeTab} asChild>
				<Grid flow="row" gap="6">
					<Grid flow="column" columns="max-content 1fr">
						<Tabs.List asChild>
							<TabsList>
								<Tabs.Trigger value="base" asChild>
									<Button variant="ghost" size="2" onClick={() => setActiveTab('base')}>
										Base
									</Button>
								</Tabs.Trigger>

								<Tabs.Trigger value="goals" asChild>
									<Button variant="ghost" size="2" onClick={() => setActiveTab('goals')}>
										Goals
									</Button>
								</Tabs.Trigger>

								<Tabs.Trigger value="personal" asChild>
									<Button variant="ghost" size="2" onClick={() => setActiveTab('personal')}>
										Personal
									</Button>
								</Tabs.Trigger>
							</TabsList>
						</Tabs.List>

						<TabsContent>
							<Tabs.Content value="base">
								<BaseTab form={form} />
							</Tabs.Content>

							<Tabs.Content value="goals">
								<GoalsTab form={form} />
							</Tabs.Content>

							<Tabs.Content value="personal">
								<PersonalTab form={form} />
							</Tabs.Content>
						</TabsContent>
					</Grid>

					<Grid flow="column" gap="3" asChild>
						<TabsActions>
							<Text as="label" size="2">
								<Flex gap="2">
									<Checkbox checked={isRead} onCheckedChange={setIsRead} /> Agree to Terms and Conditions
								</Flex>
							</Text>

							{activeTab === 'personal' ? (
								<Button type="submit" size="2" disabled={isDisabled}>
									Register
								</Button>
							) : (
								<Button size="2" onClick={toTheNextTab}>
									Next
								</Button>
							)}
						</TabsActions>
					</Grid>
				</Grid>
			</Tabs.Root>
		</Root>
	);
};

export default SignUpPage;
