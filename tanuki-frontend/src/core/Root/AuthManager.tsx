import React from 'react';

import Restricted from './Restricted';
import Authorized from './Authorized';
import NotAuthorized from './NotAuthorized';

const AuthManager = () => {
	const isAuthorized = true;
	const isAccessRestricted = false;

	switch (true) {
		case Boolean(isAccessRestricted):
			return <Restricted />;

		case Boolean(isAuthorized):
			return <Authorized />;

		default:
			return <NotAuthorized />;
	}
};

export default AuthManager;
