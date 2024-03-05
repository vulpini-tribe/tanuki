import React from 'react';

import type { Props } from './auth-module.d';

import NotAuthorized from './not-authorized';
import { useUnit } from 'effector-react';
import { $authStore } from './store';

import { useUser } from '@src/auth-module';

const AuthModuleRoot = ({ children }: Props) => {
	const authStore = useUnit($authStore);

	const user = useUser({
		retry: 0,
		// fetch on mount in case of possibly authenticated user only
		enabled: authStore.isAuthorized
	});

	switch (true) {
		case authStore.isAuthorized:
			return children;
		case user.isLoading:
			return <div>Loading ...</div>;
		default:
			return <NotAuthorized />;
	}
};

export default AuthModuleRoot;
