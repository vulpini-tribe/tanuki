import React from 'react';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';
import { $profileStore } from '../store';

import Logout from '../logout';
import { Heading, Avatar } from '@radix-ui/themes';
import Root, { Header, Content, Footer } from './root.styles';

const ProfileRoot = () => {
	const profileStore = useUnit($profileStore);

	return (
		<Root>
			<Header>
				<Avatar size="6" src={profileStore.avatar_url} fallback={profileStore.nickname[0] || '?'} />
				<Heading>{profileStore.nickname}</Heading>
			</Header>

			<Content>
				<Heading asChild>
					<NavLink to={ROUTES.PROFILE.GOALS}>Goals</NavLink>
				</Heading>

				<Heading>Weight</Heading>
				<Heading>Measurements</Heading>
			</Content>

			<Footer>
				<Logout />
			</Footer>
		</Root>
	);
};

export default ProfileRoot;
