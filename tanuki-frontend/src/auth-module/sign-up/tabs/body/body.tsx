import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const BodyTab = (props: SharedProps) => {
	const form = { errors: {} };

	return (
		<Grid mt="5" flow="row" gap="3">
			{/* Hormonal Sex | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Hormonal Sex
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
			{/* Hormonal Sex | End */}

			{/* Fat Percentage | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Fat Percentage
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
			{/* Fat Percentage | End */}
		</Grid>
	);
};

export default BodyTab;
