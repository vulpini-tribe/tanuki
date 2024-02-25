import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const GoalsTab = ({ form }: SharedProps) => {
	return (
		<Grid flow="row" gap="3">
			{/* Activity Level | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="activity_rate" size="2" highContrast color="gray">
					Activity Level
				</Text>

				<TextField.Root color={form.errors.activity_rate && 'ruby'}>
					<TextField.Input
						id="activity_rate"
						required
						placeholder="Moderate"
						{...form.activity_rate}
						radius="small"
						size="3"
					/>

					{form.errors.activity_rate && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.activity_rate.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* Activity Level | End */}

			{/* Loss / Gain / Maintain | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="goal" size="2" highContrast color="gray">
					Goal
				</Text>

				<TextField.Root color={form.errors.goal && 'ruby'}>
					<TextField.Input id="goal" required placeholder="Loss weight" {...form.goal} radius="small" size="3" />

					{form.errors.goal && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.goal.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* Loss / Gain / Maintain | End */}

			{/* Loss/Gain per week | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="per_week" size="2" highContrast color="gray">
					Loss/Gain per week
				</Text>

				<TextField.Root color={form.errors.per_week && 'ruby'}>
					<TextField.Input
						id="per_week"
						type="number"
						required
						placeholder="400"
						{...form.per_week}
						radius="small"
						size="3"
					/>

					{form.errors.per_week && (
						<TextField.Slot>
							<Tooltip content={<>{form.errors.per_week.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						</TextField.Slot>
					)}
				</TextField.Root>
			</Grid>
			{/* Loss/Gain per week | End */}
		</Grid>
	);
};

export default GoalsTab;
