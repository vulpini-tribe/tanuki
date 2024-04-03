import React from 'react';

import { useLogout } from '@src/auth-module';

import { Button } from '@radix-ui/themes';
import { ExitIcon } from '@radix-ui/react-icons';

const Logout = () => {
	const logout = useLogout({
		retry: 0
	});

	const logoutHd = () => {
		logout.mutate({});
	};

	return (
		<Button size="3" variant="soft" onClick={logoutHd} style={{ width: '100%' }}>
			<ExitIcon width={22} height={22} />
			Logout
		</Button>
	);
};

export default Logout;
