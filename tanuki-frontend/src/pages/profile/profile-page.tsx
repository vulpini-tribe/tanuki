import React from 'react';
import { useUnit } from 'effector-react';

import { $profileStore } from './store';

import Logout from './logout';
// import Goals from './goals';
import { Heading, Avatar } from '@radix-ui/themes';
import Root, { Header, Content, Footer } from './profile-page.styles';

const ProfilePage = () => {
	const profileStore = useUnit($profileStore);

	return (
		<Root>
			<Header>
				<Avatar size="6" src={profileStore.avatar_url} fallback={profileStore.nickname[0] || '?'} />
				<Heading>{profileStore.nickname}</Heading>
			</Header>

			<Content>
				<Heading>Goals</Heading>
				<Heading>Weight</Heading>
				<Heading>Measurements</Heading>
			</Content>

			<Footer>
				<Logout />
			</Footer>
		</Root>
	);
};

export default ProfilePage;
