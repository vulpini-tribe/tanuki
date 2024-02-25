import React from 'react';
import { Controller } from 'react-hook-form';

import * as SelectPrim from '@radix-ui/react-select';

import type { Props } from './select.d';

const Select = ({ name, placeholder, control, values = [] }: Props) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { ref, ...field } }) => {
				const onChangeHd = (nextValue: string) => {
					if (!nextValue) return;

					field.onChange(nextValue);
				};

				return (
					<SelectPrim.Root onValueChange={onChangeHd} defaultValue={placeholder} {...field}>
						<SelectPrim.Trigger>
							<SelectPrim.Value>{field.value || placeholder}</SelectPrim.Value>
						</SelectPrim.Trigger>

						<SelectPrim.Content>
							{values.map((value) => (
								<SelectPrim.Item key={value.value} value={value.value}>
									{value.label}
								</SelectPrim.Item>
							))}
						</SelectPrim.Content>
					</SelectPrim.Root>
				);
			}}
		></Controller>
	);
};

Select.defaultProps = {
	placeholder: 'Select item',
	values: [],
	name: ''
};

export default Select;
