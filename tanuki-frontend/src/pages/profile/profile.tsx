import React from 'react';

import { useLogout } from '@src/auth-module';

const ProfilePage = () => {
	const logout = useLogout({
		retry: 0
	});

	const logoutHd = () => {
		logout.mutate({});
	};

	return (
		<div>
			<h1>Profile</h1>
			<button onClick={logoutHd}>Logout</button>
		</div>
	);
};

export default ProfilePage;
