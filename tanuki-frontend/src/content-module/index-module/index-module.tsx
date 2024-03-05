import React from 'react';
import { Button } from '@radix-ui/themes';

import { toggleAuth } from '../../auth-module/store';

import toast from 'react-hot-toast';
import { useLogout } from '@src/auth-module';

const IndexModule = () => {
	const logoutReq = useLogout({
		retry: 0,
		onSuccess: () => {
			toggleAuth(false);
		},
		onError: () => {
			toast.error('Failed to log out');
		}
	});

	const logout = () => {
		logoutReq.mutate({});
	};

	return (
		<div>
			<h1>Index Module</h1>

			<Button onClick={logout}>Log Out</Button>
		</div>
	);
};

export default IndexModule;
