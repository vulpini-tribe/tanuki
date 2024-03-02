import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';
import useSignIn from './hooks/useSignIn';

import { Grid, TextField, IconButton, Flex, Button, Text, Tooltip, Heading, Checkbox } from '@radix-ui/themes';
import { InfoCircledIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';

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
		<Flex direction="column" style={{ width: '65%' }}>
			<Heading size="6" mb="7">
				Welcome Back
			</Heading>
			<form method="post" noValidate onSubmit={form.submit(onSubmit)} onChange={form.revalidate}>
				{/* E-Mail | Start */}
				<Grid flow="row" rows="min-content" gap="2">
					<Text as="label" htmlFor="email" size="2" highContrast color="gray">
						E-Mail
					</Text>

					<TextField.Root color={form.errors.email && 'ruby'}>
						<TextField.Slot>
							{form.errors.email ? (
								<Tooltip content={<>{form.errors.email.message}</>}>
									<InfoCircledIcon color="var(--ruby-10)" />
								</Tooltip>
							) : (
								<PersonIcon />
							)}
						</TextField.Slot>

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
					</TextField.Root>
				</Grid>
				{/* E-Mail | End */}

				{/* Password | Start */}
				<Grid flow="row" rows="min-content" gap="2" mt="3">
					<Text as="label" htmlFor="password" size="2" highContrast color="gray">
						Password
					</Text>

					<TextField.Root color={form.errors.password && 'ruby'}>
						<TextField.Slot>
							{form.errors.password ? (
								<Tooltip content={<>{form.errors.password.message}</>}>
									<InfoCircledIcon color="var(--ruby-10)" />
								</Tooltip>
							) : (
								<LockClosedIcon />
							)}
						</TextField.Slot>

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
					</TextField.Root>
				</Grid>
				{/* Password | End */}

				<Grid flow="column" columns="2fr 1fr" mt="4" align="center">
					<Text as="label" size="2">
						<Flex gap="2">
							<Checkbox /> Remember me
						</Flex>
					</Text>

					<Button asChild radius="small" variant="ghost">
						<NavLink to={ROUTES.AUTH.RESET_PASSWORD}>Restore password</NavLink>
					</Button>
				</Grid>

				<Grid flow="column" columns="1fr" mt="6" align="center">
					<Button type="submit" radius="small" variant="solid" size="3" disabled={isSubmitBtnDisabled}>
						{request.isFetching ? '...' : 'Login'}
					</Button>
				</Grid>
			</form>

			<Flex justify="center" mt="5">
				<Text size="2" highContrast>
					Don&apos;t have an account?{' '}
					<Button asChild radius="small" variant="ghost" highContrast>
						<NavLink to={ROUTES.AUTH.SIGN_UP}>Sign up</NavLink>
					</Button>
				</Text>
			</Flex>
		</Flex>
	);
};

export default SignInPage;
