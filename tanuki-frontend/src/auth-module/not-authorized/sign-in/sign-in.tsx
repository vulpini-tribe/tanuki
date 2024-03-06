import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';
import { useLogin } from '@src/auth-module';
import useSignIn from './hooks/useSignIn';

import { Grid, TextField, IconButton, Flex, Button, Text, Tooltip, Heading } from '@radix-ui/themes';
import { InfoCircledIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';

const SignInPage = () => {
	const { form } = useSignIn();
	const request = useLogin();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const onSubmit = () => {
		const values = form.getValues();
		request.mutate(values);
	};

	const isSubmitBtnDisabled = Boolean(form.errors.password || form.errors.email) || request.isPending;

	return (
		<Flex direction="column" style={{ width: '65%' }}>
			<Heading size="6" mb="7">
				Login to your account
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
							placeholder="E-Mail"
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
							placeholder="Password"
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

				<Grid flow="column" columns="2fr 5fr" mt="4" align="center" gap="4">
					<Button asChild radius="small" variant="surface" size="3" highContrast>
						<NavLink to={ROUTES.AUTH.SIGN_UP}>Sign up</NavLink>
					</Button>

					<Button type="submit" radius="small" variant="solid" size="3" disabled={isSubmitBtnDisabled}>
						{request.isPending ? '•••' : 'Login'}
					</Button>
				</Grid>
			</form>

			<Flex align="center" justify="start" mt="2">
				<Button asChild radius="small" variant="ghost" size="1">
					<NavLink to={ROUTES.AUTH.RESET_PASSWORD}>Restore password</NavLink>
				</Button>
			</Flex>
		</Flex>
	);
};

export default SignInPage;
