import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';
// import useFormHook from './useFormHook';
// import useSignInReq from './useSignInReq';

import validateEmail from '@validations/email';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Grid, TextField, IconButton, Box, Flex, Button, Text } from '@radix-ui/themes';

const SignInPage = () => {
	// const form = useFormHook();
	// const request = useSignInReq(form.setError);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<Flex direction="column" style={{ width: '75%', maxWidth: 500 }}>
			<form method="post">
				{/* E-Mail | Start */}
				<Grid flow="row" rows="min-content" gap="2">
					<Text as="label" htmlFor="email" size="2" highContrast color="gray">
						E-Mail
					</Text>

					<TextField.Input id="email" type="email" required placeholder="example@foo.bar" radius="small" size="3" />
				</Grid>
				{/* E-Mail | End */}

				{/* Password | Start */}
				<Grid flow="row" rows="min-content" gap="2" mt="3">
					<Text as="label" htmlFor="email" size="2" highContrast color="gray">
						Password
					</Text>

					<TextField.Root>
						<TextField.Input
							id="password"
							required
							placeholder="••••••"
							autoComplete="current-password"
							type={isPasswordVisible ? 'text' : 'password'}
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

				<Grid flow="column" columns="1fr 2fr" gap="5" mt="5" align="center">
					<input type="hidden" />
					<Button type="submit" radius="small" variant="solid">
						Login
					</Button>

					<Button asChild radius="small" variant="ghost">
						<NavLink to={ROUTES.AUTH.RESET_PASSWORD}>Restore password</NavLink>
					</Button>
				</Grid>
			</form>
		</Flex>
	);
};

export default SignInPage;
