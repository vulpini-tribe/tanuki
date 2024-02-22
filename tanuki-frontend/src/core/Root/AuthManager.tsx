import React from 'react';

import Restricted from './Restricted';
import Authorized from './Authorized';
// @ts-ignore
const Authorization = React.lazy(() => import('@pages/Authorization'));

const AuthManager = () => {
	const isAuthorized = false;
	const isAccessRestricted = false;

	switch (true) {
		case Boolean(isAccessRestricted):
			return <Restricted />;

		case Boolean(isAuthorized):
			return <Authorized />;

		default:
			return <Authorization />;
	}
};

export default AuthManager;
