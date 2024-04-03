import React from 'react';

import Logout from './logout';
import Measurements from './measurements';
import { Heading } from '@radix-ui/themes';
import Root, { Header, Content, Footer } from './profile-page.styles';

const ProfilePage = () => {
	return (
		<Root>
			<Header>
				<Heading>Profile</Heading>
			</Header>

			<Content>
				<Measurements />
			</Content>

			<Footer>
				<Logout />
			</Footer>
		</Root>
	);
};

export default ProfilePage;
