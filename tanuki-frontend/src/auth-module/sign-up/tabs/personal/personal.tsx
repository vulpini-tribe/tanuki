import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const PersonalTab = ({ form }: SharedProps) => {
	return (
		<Grid flow="row" gap="3">
			{/* Name | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="name" size="2" highContrast color="gray">
					Name
				</Text>

				<TextField.Root color={form.errors.name && 'ruby'}>
					<TextField.Input id="name" required placeholder="Keira" {...form.name} radius="small" size="3" />

					{form.errors.name && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.name.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* Name | End */}

			{/* DOB | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="dob" size="2" highContrast color="gray">
					DOB
				</Text>

				<TextField.Root color={form.errors.dob && 'ruby'}>
					<TextField.Input
						id="dob"
						type="date"
						required
						placeholder="17.11.1995"
						{...form.dob}
						radius="small"
						size="3"
					/>

					{form.errors.dob && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.dob.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* DOB | End */}

			{/* E_Mail | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					E_Mail
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
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="password" size="2" highContrast color="gray">
					Password
				</Text>

				<TextField.Root color={form.errors.password && 'ruby'}>
					<TextField.Input
						id="password"
						type="password"
						required
						placeholder="••••••"
						autoComplete="password"
						{...form.password}
						radius="small"
						size="3"
					/>

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

			{/* Repeat password | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="password_repeat" size="2" highContrast color="gray">
					Repeat password
				</Text>

				<TextField.Root color={form.errors.password_repeat && 'ruby'}>
					<TextField.Input
						id="password_repeat"
						type="password"
						required
						placeholder="••••••"
						autoComplete="password_repeat"
						{...form.password_repeat}
						radius="small"
						size="3"
					/>

					{form.errors.password_repeat && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.password_repeat.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* Repeat password | End */}
		</Grid>
	);
};

export default PersonalTab;
