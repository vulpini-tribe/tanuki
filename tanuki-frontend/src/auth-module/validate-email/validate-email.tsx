import React, { useEffect } from 'react';
import QS from 'qs';
import { useLocation } from 'react-router-dom';

import useValidateRequest from './hooks';

const ValidateEmail = () => {
	const location = useLocation();
	const request = useValidateRequest();

	useEffect(() => {
		const query = QS.parse(location.search, { ignoreQueryPrefix: true });

		console.log(query.token);

		request.fetch(query.token);
	}, []);

	return (
		<div>
			<h1>ValidateEmail</h1>
		</div>
	);
};

export default ValidateEmail;
