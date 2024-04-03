import React from 'react';
import { Outlet } from 'react-router-dom';

import Root from './profile-page.styles';

const ProfilePage = () => {
	return (
		<Root>
			<Outlet />
		</Root>
	);
};

export default ProfilePage;
