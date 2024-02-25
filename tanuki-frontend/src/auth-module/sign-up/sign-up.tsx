import React from 'react';

import { ProgressBar } from '@ui';
import * as Tabs from '@radix-ui/react-tabs';
import { Link, Flex, Inset, Button, Grid, Card, Text, Checkbox } from '@radix-ui/themes';

import { BaseTab, BodyTab, GoalsTab, PersonalTab } from './tabs';
import Root, { TabsRoot, TabsList, TabsContent } from './sign-up.styles';

import ROUTES from '@routes';
import useSignUp from './hooks';
const TABS_ORDER = ['base', 'goals', 'personal'] as const;

const SignUpPage = () => {
	const { form } = useSignUp();
	const [progress, setProgress] = React.useState(0);
	const [isRead, setisRead] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState('base');

	const toTheNextTab = () => {
		const currentIndex = TABS_ORDER.indexOf(activeTab);
		const nextIndex = currentIndex + 1;
		const nextTab = TABS_ORDER[nextIndex];

		setActiveTab(nextTab);
	};

	const onSubmit = (data: unknown) => {
		console.log(data);
	};

	console.log('form', form.getValues());

	return (
		<Root method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
			<Tabs.Root value={activeTab} asChild>
				<TabsRoot>
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
							<BaseTab setProgress={setProgress} form={form} />
						</Tabs.Content>

						<Tabs.Content value="goals">
							<GoalsTab setProgress={setProgress} form={form} />
						</Tabs.Content>

						<Tabs.Content value="personal">
							<PersonalTab setProgress={setProgress} form={form} />
						</Tabs.Content>
					</TabsContent>
				</TabsRoot>
			</Tabs.Root>
		</Root>
	);

	// return (
	// 	<Card size="1" style={{ width: '75%', maxWidth: 500 }}>
	// 		<Inset clip="padding-box">
	// 			<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
	// 				<Grid flow="row" gap="3" rows="repeat(2, max-content)" p="6">
	// 					<Tabs.Root value={activeTab} asChild>
	// 						<Grid align="center" flow="column" columns="max-content 1fr" gap="6" height="100%">
	// 							<Tabs.List asChild>
	// 								<TabsList>
	// <Tabs.Trigger value="base" asChild>
	// 	<Button variant="ghost" size="2" onClick={() => setActiveTab('base')}>
	// 		Base
	// 	</Button>
	// </Tabs.Trigger>

	// <Tabs.Trigger value="goals" asChild>
	// 	<Button variant="ghost" size="2" onClick={() => setActiveTab('goals')}>
	// 		Goals
	// 	</Button>
	// </Tabs.Trigger>

	// <Tabs.Trigger value="personal" asChild>
	// 	<Button variant="ghost" size="2" onClick={() => setActiveTab('personal')}>
	// 		Personal
	// 	</Button>
	// </Tabs.Trigger>
	// 								</TabsList>
	// 							</Tabs.List>

	// 							<Tabs.Content value="base">
	// 								<BaseTab setProgress={setProgress} form={form} />
	// 							</Tabs.Content>

	// 							<Tabs.Content value="goals">
	// 								<GoalsTab setProgress={setProgress} form={form} />
	// 							</Tabs.Content>

	// 							<Tabs.Content value="personal">
	// 								<PersonalTab setProgress={setProgress} form={form} />
	// 							</Tabs.Content>
	// 						</Grid>
	// 					</Tabs.Root>

	// 					<Grid flow="column" columns="1fr min-content" gap="2" align="center">
	// 						{activeTab === 'personal' && (
	// 							<>
	// 								<Text as="label" size="2">
	// 									<Flex gap="2">
	// 										<Checkbox /> Agree to <Link href="https://google.com">Terms and Conditions</Link>
	// 									</Flex>
	// 								</Text>

	// 								<Button size="2" variant="soft" disabled={!isRead || progress < 100}>
	// 									Register
	// 								</Button>
	// 							</>
	// 						)}

	// 						{activeTab !== 'personal' && (
	// 							<>
	// 								<Text size="2">
	// 									Already have an account? <Link href={ROUTES.AUTH.SIGN_IN}>Sign in</Link>
	// 								</Text>
	// 								<Button size="2" variant="surface" onClick={toTheNextTab}>
	// 									Next
	// 								</Button>
	// 							</>
	// 						)}
	// 					</Grid>

	// 					{/* <ProgressBar progress={progress} /> */}
	// 				</Grid>
	// 			</form>
	// 		</Inset>
	// 	</Card>
	// );
};

export default SignUpPage;
