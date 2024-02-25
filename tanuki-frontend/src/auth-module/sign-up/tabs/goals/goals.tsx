import React, { useEffect } from 'react';

import { Select } from '@ui';
import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const ACTIVITY_RATES = [
	{ value: 'none', data: 1.2, label: 'Passive lifestyle' },
	{ value: 'light', data: 1.375, label: 'A little activity' },
	{ value: 'moderate', data: 1.55, label: 'Moderate activity' },
	{ value: 'heavy', data: 1.725, label: 'Heavy activity' },
	{ value: 'extreme', data: 1.9, label: 'Extreme activity' }
];

const GOAL_VALUES = [
	{ value: 'loss', label: 'Loss weight' },
	{ value: 'maintain', label: 'Maintain weight' },
	{ value: 'gain', label: 'Gain mass' }
];

import type { SharedProps } from '../shared.d';

const GoalsTab = ({ form }: SharedProps) => {
	const values = form.getValues();

	useEffect(() => {
		const BMI = Number.parseFloat((values.weight / (values.height / 100) ** 2).toFixed(2), 10);

		if (BMI < 18.5) {
			form.setValue('goal', 'gain');
		} else if (BMI > 24.9) {
			form.setValue('goal', 'loss');
		} else {
			form.setValue('goal', 'maintain');
		}

		form.setValue('activity_rate', 'light');
	}, []);

	let text = '';

	switch (values.goal) {
		case 'loss':
			text = 'Loss';
			break;
		case 'gain':
			text = 'Gain';
			break;
		default:
			text = 'Maintain';
			break;
	}

	return (
		<Grid flow="row" gap="3">
			{/* Activity Level | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="activity_rate" size="2" highContrast color="gray">
					Activity Level
				</Text>

				<Select name="activity_rate" control={form.control} values={ACTIVITY_RATES} />
			</Grid>
			{/* Activity Level | End */}

			{/* Loss / Gain / Maintain | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="goal" size="2" highContrast color="gray">
					Goal
				</Text>

				<Select name="goal" control={form.control} values={GOAL_VALUES} />
			</Grid>
			{/* Loss / Gain / Maintain | End */}

			{/* Loss/Gain per week | Start */}
			{values.goal !== 'maintain' && (
				<Grid flow="row" rows="min-content" gap="2">
					<Text as="label" htmlFor="per_week" size="2" highContrast color="gray">
						{text} per week
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
			)}
			{/* Loss/Gain per week | End */}
		</Grid>
	);
};

export default GoalsTab;
