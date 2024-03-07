import React from 'react';
import { Button } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';

import Root from './navbar.styles';

const NavBar = (props) => {
	return (
		<Root {...props}>
			<NavLink to={ROUTES.CONTENT.FEED}>
				<Button variant="outline" size="2" tabIndex={-1}>
					Home
				</Button>
			</NavLink>

			<NavLink to={ROUTES.CONTENT.FOOD}>
				<Button variant="outline" size="2" tabIndex={-1}>
					Food
				</Button>
			</NavLink>

			<NavLink to={ROUTES.CONTENT.DISHES}>
				<Button variant="outline" size="2" tabIndex={-1}>
					Dishes
				</Button>
			</NavLink>

			<NavLink to={ROUTES.UTILS.ROOT}>
				<Button variant="outline" size="2" tabIndex={-1}>
					Utils
				</Button>
			</NavLink>
		</Root>
	);
};

export default NavBar;
