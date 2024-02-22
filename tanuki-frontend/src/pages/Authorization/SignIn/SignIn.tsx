import React from 'react';
import QS from 'qs';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import Root from './SignIn.styles';
import { FormStyled } from '../Authorization.styles';

type Inputs = {
	username: string;
	password: string;
};

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SignIn = () => {
	const form = useForm<Inputs>();
	const { refetch } = useQuery({
		queryKey: ['/auth/sign-in'],
		queryFn: () =>
			fetch(`${apiUrl}/auth/sign-in`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: QS.stringify({
					username: form.getValues('username'),
					password: form.getValues('password')
				})
			}).then((res) => res.json()),
		enabled: false
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => refetch();

	return (
		<Root>
			<FormStyled onSubmit={form.handleSubmit(onSubmit)}>
				<input {...form.register('username', { required: true })} />
				<input type="password" {...form.register('password', { required: true })} />

				<input type="submit" />
			</FormStyled>
		</Root>
	);
};

export default SignIn;
