import React from 'react';

import { ProgressBar } from '@ui';
import * as Tabs from '@radix-ui/react-tabs';
import { Link, Flex, Inset, Button, Grid, Card, Text, Checkbox } from '@radix-ui/themes';

import { BaseTab, BodyTab, GoalsTab, PersonalTab } from './tabs';

import ROUTES from '@routes';
const TABS_ORDER = ['base', 'body', 'goals', 'personal'] as const;

const SignUpPage = () => {
	const [progress, setProgress] = React.useState(0);
	const [isRead, setisRead] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState('base');

	const toTheNextTab = () => {
		const currentIndex = TABS_ORDER.indexOf(activeTab);
		const nextIndex = currentIndex + 1;
		const nextTab = TABS_ORDER[nextIndex];

		setActiveTab(nextTab);
	};

	return (
		<Card style={{ width: '75%', maxWidth: 500 }}>
			<Grid>
				<Tabs.Root value={activeTab}>
					<Tabs.List asChild>
						<Flex gap="3" align="center">
							<Tabs.Trigger value="base" asChild>
								<Button variant="ghost" size="2" onClick={() => setActiveTab('base')}>
									Base
								</Button>
							</Tabs.Trigger>

							<Tabs.Trigger value="body" asChild>
								<Button variant="ghost" size="2" onClick={() => setActiveTab('body')}>
									Body
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
						</Flex>
					</Tabs.List>

					<Tabs.Content value="base" asChild>
						<BaseTab setProgress={setProgress} />
					</Tabs.Content>

					<Tabs.Content value="body" asChild>
						<BodyTab setProgress={setProgress} />
					</Tabs.Content>

					<Tabs.Content value="goals" asChild>
						<GoalsTab setProgress={setProgress} />
					</Tabs.Content>

					<Tabs.Content value="personal" asChild>
						<PersonalTab setProgress={setProgress} />
					</Tabs.Content>
				</Tabs.Root>

				<Grid flow="column" columns="1fr min-content" gap="2" align="center" mt="5" mb="3">
					{activeTab === 'personal' && (
						<>
							<Text as="label" size="2">
								<Flex gap="2">
									<Checkbox /> Agree to <Link href="https://google.com">Terms and Conditions</Link>
								</Flex>
							</Text>

							<Button size="2" variant="soft" disabled={!isRead || progress < 100}>
								Register
							</Button>
						</>
					)}

					{activeTab !== 'personal' && (
						<>
							<Text size="2">
								Already have an account? <Link href={ROUTES.AUTH.SIGN_IN}>Sign in</Link>
							</Text>
							<Button size="2" variant="surface" onClick={toTheNextTab}>
								Next
							</Button>
						</>
					)}
				</Grid>

				<Inset clip="border-box" side="bottom">
					<ProgressBar progress={progress} />
				</Inset>
			</Grid>
		</Card>
	);
};

export default SignUpPage;
