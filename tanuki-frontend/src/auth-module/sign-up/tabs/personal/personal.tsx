import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const PersonalTab = (props: SharedProps) => {
	const form = { errors: {} };

	return (
		<Grid mt="5" flow="row" gap="3">
			{/* Name | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Name
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
			{/* Name | End */}

			{/* DOB | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					DOB
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
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Password
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
			{/* Password | End */}

			{/* Repeat password | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Repeat password
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
			{/* Repeat password | End */}
		</Grid>
	);
};

export default PersonalTab;
