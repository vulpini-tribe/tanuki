import React from 'react';

import { Grid, TextField, Text, Tooltip } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import type { SharedProps } from '../shared.d';

const BaseTab = ({ setProgress, form }: SharedProps) => {
	return (
		<Grid mt="5" flow="row" gap="3">
			{/* Weight | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="height" size="2" highContrast color="gray">
					Weight
				</Text>

				<TextField.Root color={form.errors.weight && 'ruby'}>
					<TextField.Input
						id="height"
						type="number"
						required
						placeholder="96"
						{...form.weight}
						radius="small"
						size="3"
					/>

					<TextField.Slot>
						{form.errors.weight && (
							<Tooltip content={<>{form.errors.weight.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						)}
					</TextField.Slot>
				</TextField.Root>
			</Grid>
			{/* Weight | End */}

			{/* Height | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="height" size="2" highContrast color="gray">
					Height
				</Text>

				<TextField.Root color={form.errors.height && 'ruby'}>
					<TextField.Input
						id="height"
						type="number"
						required
						placeholder="187"
						autoComplete="height"
						{...form.height}
						radius="small"
						size="3"
					/>

					<TextField.Slot>
						{form.errors.height && (
							<Tooltip content={<>{form.errors.height.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						)}
					</TextField.Slot>
				</TextField.Root>
			</Grid>
			{/* Height | End */}

			{/* Age | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="age" size="2" highContrast color="gray">
					Age
				</Text>

				<TextField.Root color={form.errors.age && 'ruby'}>
					<TextField.Input
						id="age"
						type="age"
						required
						placeholder="27"
						autoComplete="age"
						{...form.age}
						radius="small"
						size="3"
					/>

					<TextField.Slot>
						{form.errors.age && (
							<Tooltip content={<>{form.errors.age.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						)}
					</TextField.Slot>
				</TextField.Root>
			</Grid>
			{/* Age | End */}

			{/* Hormonal Sex | Start */}
			<Grid flow="row" rows="min-content" gap="2">
				<Text as="label" htmlFor="hormonal_sex" size="2" highContrast color="gray">
					Hormonal Sex
				</Text>

				<TextField.Root color={form.errors.hormonal_sex && 'ruby'}>
					<TextField.Input
						id="hormonal_sex"
						required
						placeholder="female"
						autoComplete="hormonal_sex"
						{...form.hormonal_sex}
						radius="small"
						size="3"
					/>

					<TextField.Slot>
						{form.errors.hormonal_sex && (
							<Tooltip content={<>{form.errors.hormonal_sex.message}</>}>
								<InfoCircledIcon color="var(--ruby-10)" />
							</Tooltip>
						)}
					</TextField.Slot>
				</TextField.Root>
			</Grid>
			{/* Hormonal Sex | End */}
		</Grid>
	);
};

export default BaseTab;
