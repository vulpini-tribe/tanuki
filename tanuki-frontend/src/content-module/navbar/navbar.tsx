import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '@routes';

import { useLogout } from '@src/auth-module';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IconButton, Box, Flex } from '@radix-ui/themes';
import { Cross2Icon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Overlay, MenuItem, Content, CloseButton, TriggerButton } from './navbar.styles';

const Profile = () => {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const logout = useLogout({
		retry: 0
	});

	const logoutHd = () => {
		setIsModalOpened(false);
		logout.mutate({});
	};

	const onClickHd = () => {
		setIsModalOpened(false);
	};

	return (
		<AlertDialog.Root defaultOpen={false} open={isModalOpened} onOpenChange={setIsModalOpened}>
			<AlertDialog.Trigger asChild>
				<TriggerButton>
					<ChevronRightIcon />
				</TriggerButton>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<Overlay />

				<Content>
					<Box grow="1">
						<MenuItem>
							<NavLink to={ROUTES.CONTENT.ROOT} onClick={onClickHd}>
								HOME
							</NavLink>
						</MenuItem>

						<MenuItem>
							<NavLink to={ROUTES.CONTENT.FEED} onClick={onClickHd}>
								MEALS FEED
							</NavLink>
						</MenuItem>

						<MenuItem>
							<NavLink to={ROUTES.CONTENT.FOOD} onClick={onClickHd}>
								FOOD MANAGER
							</NavLink>
						</MenuItem>
					</Box>

					<Flex direction="column" align="end">
						<MenuItem>
							<NavLink to={ROUTES.UTILS.ROOT} onClick={onClickHd}>
								Utils
							</NavLink>
						</MenuItem>

						<MenuItem>Profile</MenuItem>

						<MenuItem onClick={logoutHd}>Logout</MenuItem>
					</Flex>

					<IconButton onClick={() => setIsModalOpened(false)} asChild>
						<CloseButton>
							<Cross2Icon width={64} height={64} />
						</CloseButton>
					</IconButton>
				</Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default Profile;
