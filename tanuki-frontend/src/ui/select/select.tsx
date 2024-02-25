import React from 'react';
import { Controller } from 'react-hook-form';

import { Select } from '@radix-ui/themes';

import type { Props } from './select.d';

const SelectC = ({ name, control, values = [] }: Props) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { ref, ...field } }) => (
				<Select.Root onValueChange={field.onChange} {...field}>
					<Select.Trigger />

					<Select.Content>
						{values.map((value) => (
							<Select.Item key={value.value} value={value.value}>
								{value.label}
							</Select.Item>
						))}
					</Select.Content>
				</Select.Root>
			)}
		></Controller>
	);
};

SelectC.defaultProps = {
	placeholder: 'Select item',
	values: [],
	name: ''
};

export default SelectC;
