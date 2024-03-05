import React, { useEffect } from 'react';
import { Button } from '@radix-ui/themes';

import { useUnit } from 'effector-react';
import { $authStore, toggleAuth, deleteUserId } from '../../auth-module/store';

import { useError } from '@hooks';
import { useQuery } from '@tanstack/react-query';

import axios from '@axios';

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

async function fetchPosts() {
	const resp = await axios({
		method: 'post',
		url: `${apiUrl}/auth/sign-out`,
		withCredentials: true
	});

	deleteUserId();

	return resp.data;
}

const useLogoutRequest = () => {
	const authStore = useUnit($authStore);

	const { isFetching, error, errorUpdatedAt, data, dataUpdatedAt, ...restProps } = useQuery({
		queryKey: ['/api/auth/sign-out', authStore.userId],
		queryFn: fetchPosts,
		enabled: false,
		retry: 0
	});

	useError({ error, errorUpdatedAt, data, dataUpdatedAt });

	return {
		isFetching,
		refetch: restProps.refetch
	};
};

const IndexModule = () => {
	const logoutMod = useLogoutRequest();

	const logout = () => {
		logoutMod.refetch();
	};

	return (
		<div>
			<h1>Index Module</h1>

			<Button onClick={logout}>Log Out</Button>
		</div>
	);
};

export default IndexModule;
