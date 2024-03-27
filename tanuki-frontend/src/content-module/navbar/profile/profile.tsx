import React from 'react';
import { useUnit } from 'effector-react';

import { useLogout } from '@src/auth-module';
import { $profileStore } from './store';

import { Avatar, IconButton, Grid, Tooltip } from '@radix-ui/themes';
import { ExitIcon } from '@radix-ui/react-icons';
import Root from './profile.styles';

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
			<Grid gap="5" flow="row">
				<Avatar src={profileStore.avatar_url} fallback={profileStore.nickname[0]} size="2" radius="full" />

				<Tooltip content="Logout">
					<IconButton onClick={logoutHd} variant="outline" size="2">
						<ExitIcon />
					</IconButton>
				</Tooltip>
			</Grid>
		</Root>
	);
};

export default Profile;
