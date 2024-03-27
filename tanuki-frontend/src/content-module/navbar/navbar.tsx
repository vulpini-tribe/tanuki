import React from 'react';
import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import {
	HomeIcon,
	ActivityLogIcon,
	CrumpledPaperIcon,
	CardStackPlusIcon,
	RulerSquareIcon
} from '@radix-ui/react-icons';

import ROUTES from '@routes';

import Root from './navbar.styles';
import Profile from './profile';

const NavBar = () => {
	return (
		<Root>
			<Flex gap="6" direction="column" align="center" grow="1">
				<Tooltip content="Home">
					<NavLink to={ROUTES.CONTENT.ROOT}>
						<IconButton variant="outline" size="2">
							<HomeIcon />
						</IconButton>
					</NavLink>
				</Tooltip>

				<Tooltip content="Feed">
					<NavLink to={ROUTES.CONTENT.FEED}>
						<IconButton variant="outline" size="2">
							<ActivityLogIcon />
						</IconButton>
					</NavLink>
				</Tooltip>

				<Tooltip content="Food">
					<NavLink to={ROUTES.CONTENT.FOOD}>
						<IconButton variant="outline" size="2">
							<CrumpledPaperIcon />
						</IconButton>
					</NavLink>
				</Tooltip>

				<Tooltip content="Dishes">
					<NavLink to={ROUTES.CONTENT.DISHES}>
						<IconButton variant="outline" size="2">
							<CardStackPlusIcon />
						</IconButton>
					</NavLink>
				</Tooltip>

				<Tooltip content="Utils">
					<NavLink to={ROUTES.UTILS.ROOT}>
						<IconButton variant="outline" size="2">
							<RulerSquareIcon />
						</IconButton>
					</NavLink>
				</Tooltip>
			</Flex>

			<Profile />
		</Root>
	);
};

export default NavBar;
