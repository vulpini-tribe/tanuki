import React, { useState } from 'react';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';

import { Button, Avatar, Text, IconButton, Box, Grid, Tooltip, Popover } from '@radix-ui/themes';
import { ExitIcon, HamburgerMenuIcon, HomeIcon } from '@radix-ui/react-icons';

import ROUTES from '@routes';
import { useLogout } from '@src/auth-module';
import { $profileStore } from './store';
import Root, { ProfileLink, NavBarMenu } from './profile.styles';

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
			<NavBarMenu>
				<Box mr="5">
					<Popover.Root>
						<Popover.Trigger>
							<IconButton variant="outline" size="2">
								<HamburgerMenuIcon />
							</IconButton>
						</Popover.Trigger>

						<Popover.Content style={{ width: 360 }}>
							<Grid flow="row" gap="3">
								<NavLink to={ROUTES.CONTENT.FEED}>
									<Button variant="ghost" size="2" tabIndex={-1}>
										Home
									</Button>
								</NavLink>
								<NavLink to={ROUTES.CONTENT.FOOD}>
									<Button variant="ghost" size="2" tabIndex={-1}>
										Food
									</Button>
								</NavLink>

								<NavLink to={ROUTES.CONTENT.DISHES}>
									<Button variant="ghost" size="2" tabIndex={-1}>
										Dishes
									</Button>
								</NavLink>

								<NavLink to={ROUTES.SETTINGS.ROOT}>
									<Button variant="ghost" size="2" tabIndex={-1}>
										Settings
									</Button>
								</NavLink>
							</Grid>
						</Popover.Content>
					</Popover.Root>
				</Box>
			</NavBarMenu>

			<Grid gap="3" flow="column">
				<Avatar src={profileStore.avatar_url} fallback={profileStore.nickname[0]} size="4" radius="full" />

				<Box>
					<Text as="div" size="2" weight="bold">
						{profileStore.nickname}
					</Text>
					<ProfileLink as={Text} size="1" color="gray">
						{profileStore.mode} mode
					</ProfileLink>
				</Box>
			</Grid>

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
