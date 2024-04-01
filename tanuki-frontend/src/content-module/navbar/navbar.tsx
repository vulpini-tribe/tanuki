import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '@routes';

import { IconButton, Tooltip } from '@radix-ui/themes';
import { HomeIcon, ActivityLogIcon, PersonIcon, RulerSquareIcon, HobbyKnifeIcon } from '@radix-ui/react-icons';
import Root from './navbar.styles';

const NavBar = () => {
	return (
		<Root>
			<NavLink to={ROUTES.CONTENT.ROOT}>
				<Tooltip content="Home">
					<IconButton variant="ghost">
						<HomeIcon color="green" width={22} height={22} />
					</IconButton>
				</Tooltip>
			</NavLink>

			<NavLink to={ROUTES.CONTENT.FEED}>
				<Tooltip content="Feed">
					<IconButton variant="ghost">
						<ActivityLogIcon color="green" width={22} height={22} />
					</IconButton>
				</Tooltip>
			</NavLink>

			<NavLink to={ROUTES.CONTENT.FOOD}>
				<Tooltip content="Content Manager">
					<IconButton variant="ghost">
						<HobbyKnifeIcon color="green" width={22} height={22} />
					</IconButton>
				</Tooltip>
			</NavLink>

			<NavLink to={ROUTES.UTILS.ROOT}>
				<Tooltip content="Instruments">
					<IconButton variant="ghost">
						<RulerSquareIcon color="green" width={22} height={22} />
					</IconButton>
				</Tooltip>
			</NavLink>

			<NavLink to={ROUTES.PROFILE.ROOT}>
				<Tooltip content="NavBar">
					<IconButton variant="ghost">
						<PersonIcon color="green" width={22} height={22} />
					</IconButton>
				</Tooltip>
			</NavLink>
		</Root>
	);
};

export default NavBar;
