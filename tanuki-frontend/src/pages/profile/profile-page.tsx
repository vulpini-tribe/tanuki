import React from 'react';

import Logout from './logout';
import { Text, Heading } from '@radix-ui/themes';
import { Header, Content, Footer } from './profile-page.styles';

const ProfilePage = () => {
	return (
		<>
			<Header>
				<Heading>Profile</Heading>
			</Header>

			<Content>
				<Text>Content</Text>
			</Content>

			<Footer>
				<Logout />
			</Footer>
		</>
	);
};

export default ProfilePage;
