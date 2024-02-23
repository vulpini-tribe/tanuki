import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';

import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Grid, TextField, IconButton, Heading, Box, Flex, Link, Button } from '@radix-ui/themes';

const SignInPage = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<Form.Root asChild>
			<Flex direction="column" style={{ maxWidth: 400 }}>
				<Box mt="8">
					<Form.Field name="email">
						<Form.Label asChild>
							<Label.Root htmlFor="email">E-Mail</Label.Root>
						</Form.Label>

						<Form.Control asChild>
							<TextField.Input id="email" placeholder="Search the docs…" size="2" radius="small" />
						</Form.Control>

						{/* <Form.Message>Not valid</Form.Message> */}
						{/* <Form.ValidityState /> */}
					</Form.Field>
				</Box>

				<Box mt="2">
					<Form.Field name="password">
						<Form.Label asChild>
							<Label.Root htmlFor="password">Password</Label.Root>
						</Form.Label>

						<Form.Control asChild>
							<TextField.Root>
								<TextField.Input id="password" placeholder="Password" type="password" size="2" radius="small" />
								<TextField.Slot>
									<IconButton type="button" variant="ghost" onClick={togglePasswordVisibility}>
										{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
									</IconButton>
								</TextField.Slot>
							</TextField.Root>
						</Form.Control>
						{/* <Form.Message>Not valid</Form.Message> */}
						{/* <Form.ValidityState /> */}
					</Form.Field>
				</Box>

				<Grid flow="column" columns="1fr 2fr" gap="5" mt="5" align="center">
					<Form.Submit asChild>
						<Button type="submit" radius="small" variant="solid">
							Login
						</Button>
					</Form.Submit>

					<Button asChild radius="small" variant="ghost">
						<NavLink to={ROUTES.AUTH.SIGN_UP}>Create account</NavLink>
					</Button>
				</Grid>
			</Flex>
		</Form.Root>
	);
};

export default SignInPage;
