import React, { useEffect } from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Command } from 'cmdk';
import { DropdownMenu, Button } from '@radix-ui/themes';

import useSearch from './useSearch';

const SearchSelect = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const searchRequest = useSearch(searchQuery);

	console.log(searchRequest);

	useEffect(() => {
		if (!searchQuery) return;

		searchRequest.refetch();
	}, [searchQuery]);

	const onSelect = (nextValue: string) => {
		setOpen(false);
	};

	const data = searchRequest?.data?.data?.data || [];

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger>
				<Button>{searchQuery}</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<Command>
					<div>
						<MagnifyingGlassIcon aria-hidden width="20px" height="20px" />
						<Command.Input value={searchQuery} onValueChange={setSearchQuery} />
					</div>

					<Command.List>
						{data.map((item) => {
							return (
								<Command.Item className="DropdownMenuItem" key={item.id} onSelect={() => onSelect(item.id)}>
									{item.name}
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
