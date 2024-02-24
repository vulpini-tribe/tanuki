import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';
import useSignIn from './hooks/useSignIn';

import { InfoCircledIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Grid, TextField, IconButton, Flex, Button, Text, Tooltip } from '@radix-ui/themes';

const SignInPage = () => {
	const { form, request } = useSignIn();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const onSubmit = () => {
		request.fetch();
	};

	const isSubmitBtnDisabled = Boolean(form.errors.password || form.errors.email) || request.isFetching;

	return (
		<Flex direction="column" style={{ width: '75%', maxWidth: 500 }}>
			<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
				{/* E-Mail | Start */}
				<Grid flow="row" rows="min-content" gap="2">
					<Text as="label" htmlFor="email" size="2" highContrast color="gray">
						E-Mail
					</Text>

					<TextField.Root color={form.errors.email && 'ruby'}>
						<TextField.Input
							id="email"
							type="email"
							required
							placeholder="example@foo.bar"
							autoComplete="email"
							{...form.email}
							radius="small"
							size="3"
						/>

						{form.errors.email && (
							<TextField.Slot>
								<Tooltip content={<>{form.errors.email.message}</>}>
									<InfoCircledIcon color="var(--ruby-10)" />
								</Tooltip>
							</TextField.Slot>
						)}
					</TextField.Root>
				</Grid>
				{/* E-Mail | End */}

				{/* Password | Start */}
				<Grid flow="row" rows="min-content" gap="2" mt="3">
					<Text as="label" htmlFor="email" size="2" highContrast color="gray">
						Password
					</Text>

					<TextField.Root color={form.errors.password && 'ruby'}>
						<TextField.Input
							id="password"
							required
							placeholder="••••••"
							autoComplete="current-password"
							type={isPasswordVisible ? 'text' : 'password'}
							{...form.password}
							radius="small"
							size="3"
						/>
						<TextField.Slot>
							<IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
								{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
							</IconButton>
						</TextField.Slot>

						{form.errors.password && (
							<TextField.Slot>
								<Tooltip content={<>{form.errors.password.message}</>}>
									<InfoCircledIcon color="var(--ruby-10)" />
								</Tooltip>
							</TextField.Slot>
						)}
					</TextField.Root>
				</Grid>
				{/* Password | End */}

				<Grid flow="column" columns="1fr 2fr" gap="5" mt="5" align="center">
					<Button type="submit" radius="small" variant="solid" disabled={isSubmitBtnDisabled}>
						{request.isFetching ? '...' : 'Login'}
					</Button>

					<Button asChild radius="small" variant="soft" highContrast>
						<NavLink to={ROUTES.AUTH.RESET_PASSWORD}>Restore password</NavLink>
					</Button>
				</Grid>
			</form>
		</Flex>
	);
};

export default SignInPage;
