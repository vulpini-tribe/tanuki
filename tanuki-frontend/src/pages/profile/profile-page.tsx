import React from 'react';

import Logout from './logout';
import { Text, Heading } from '@radix-ui/themes';
import Root, { Header, Content, Footer } from './profile-page.styles';

const ProfilePage = () => {
	return (
		<Root>
			<Header>
				<Heading>Profile</Heading>
			</Header>

			<Content>
				<Text>Content</Text>
			</Content>

			<Footer>
				<Logout />
			</Footer>
		</Root>
	);
};

export default ProfilePage;
