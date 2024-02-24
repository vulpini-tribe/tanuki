import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const GoalsTab = (props: SharedProps) => {
	const form = { errors: {} };

	return (
		<Grid mt="5" flow="row" gap="3">
			{/* Loss / Gain / Maintain | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Loss / Gain / Maintain
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
			{/* Loss / Gain / Maintain | End */}

			{/* Loss/Gain per week | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Loss/Gain per week
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
			{/* Loss/Gain per week | End */}

			{/* Calories | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Calories
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
			{/* Calories | End */}
		</Grid>
	);
};

export default GoalsTab;
