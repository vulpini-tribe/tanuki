import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const BaseTab = (props: SharedProps) => {
	const form = { errors: {} };

	return (
		<Grid mt="5" flow="row" gap="3">
			{/* Weight | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Weight
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
			{/* Weight | End */}

			{/* Height | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Height
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
			{/* Height | End */}

			{/* Age | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="email" size="2" highContrast color="gray">
					Age
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
			{/* Age | End */}
		</Grid>
	);
};

export default BaseTab;
