import React from 'react';
import { useUnit } from 'effector-react';

import { Avatar, Text, IconButton, Box, Tooltip } from '@radix-ui/themes';
import { ExitIcon } from '@radix-ui/react-icons';

import { useLogout } from '@src/auth-module';
import { $profileStore } from './store';
import Root, { ProfileLink } from './profile.styles';

const Profile = () => {
	const profileStore = useUnit($profileStore);

	const logout = useLogout({
		retry: 0
	});

	const logoutHd = () => {
		logout.mutate({});
	};

	return (
		<Root>
			<Avatar src={profileStore.avatar_url} fallback={profileStore.nickname[0]} size="4" radius="full" />

			<Box>
				<Text as="div" size="2" weight="bold">
					{profileStore.nickname}
				</Text>
				<ProfileLink as={Text} size="1" color="gray">
					{profileStore.mode} mode
				</ProfileLink>
			</Box>

			<Box ml="5">
				<Tooltip content="Logout">
					<IconButton onClick={logoutHd} variant="outline" size="2">
						<ExitIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Root>
	);
};

export default Profile;
