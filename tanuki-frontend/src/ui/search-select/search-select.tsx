import React from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Command } from 'cmdk';
import { DropdownMenu, TextField, Button } from '@radix-ui/themes';

const data = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Pineapple', value: 'pineapple' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Watermelon', value: 'watermelon' },
	{ label: 'Grape', value: 'grape' },
	{ label: 'Kiwi', value: 'kiwi' },
	{ label: 'Mango', value: 'mango' }
];

const SearchSelect = () => {
	const [value, setValue] = React.useState(data[0].value);
	const [open, setOpen] = React.useState(false);

	const onSelect = (nextValue: string) => {
		setOpen(false);
		setValue(nextValue);
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger>
				<Button>{data.find((item) => item.value === value)?.label}</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<Command>
					<div>
						<MagnifyingGlassIcon aria-hidden width="20px" height="20px" />
						<Command.Input />
					</div>

					<Command.List>
						{data.map((item) => {
							return (
								<Command.Item className="DropdownMenuItem" key={item.value} onSelect={() => onSelect(item.value)}>
									{item.label}
								</Command.Item>
							);
						})}
					</Command.List>
				</Command>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default SearchSelect;
