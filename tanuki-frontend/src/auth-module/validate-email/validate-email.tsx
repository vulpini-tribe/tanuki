import React, { useEffect } from 'react';
import QS from 'qs';
import { useLocation } from 'react-router-dom';

import { Grid, Heading, Text } from '@radix-ui/themes';

import useValidateRequest from './hooks';

const ValidateEmail = () => {
	const location = useLocation();
	const request = useValidateRequest();

	useEffect(() => {
		const query = QS.parse(location.search, { ignoreQueryPrefix: true });

		request.fetch(query.token as string);
	}, []);

	return (
		<div>
			<Grid flow="row" gap="4">
				<Heading>E-Mail validation</Heading>

				{request.isFetching && !request.error && <Text>Please wait...</Text>}
				{!request.isFetching && request.error && (
					<Text>
						We can&apos;t validate your E-Mail address.
						<br />
						Please check an expiration date of the link
					</Text>
				)}

				{!request.isFetching && !request.error && <Text>Your E-Mail has been successfully validated</Text>}
			</Grid>
		</div>
	);
};

export default ValidateEmail;
