import React from 'react';

import { SubText, Text } from '@ui';
import Root, { Wrapper, Code, Message } from './Forbidden.styles';

const now = new Date();

const Forbidden = () => (
	<Root>
		<Wrapper>
			<Code>403</Code>
			<Message>Access Error</Message>

			<Text $color="dark">You don&apos;t have permission to access this page.</Text>
		</Wrapper>

		<SubText $color="light">© {now.getFullYear()} Tanuki Health</SubText>
	</Root>
);

export default Forbidden;
