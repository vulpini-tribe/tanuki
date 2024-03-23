import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@react-hooks-library/core';

import { Command } from 'cmdk';
import { DropdownMenu, Button, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import useSearch from './useSearch';
import type { Props, SearchEntry } from './search-select.d';

const SearchSelect = ({ onChange, labelKey, valueKey }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [isMenuOpen, setMenuOpen] = useState(false);
	const [value, setValue] = useState<SearchEntry>({});

	const testRef = React.useRef(null);

	const searchRequest = useSearch(debouncedQuery);

	useEffect(() => {
		if (!debouncedQuery) return;

		searchRequest.refetch();
	}, [debouncedQuery]);

	useEffect(() => {
		if (!isMenuOpen) return;

		window.setTimeout(() => {
			testRef.current?.focus();
		}, 0);
	}, [isMenuOpen]);

	const data = searchRequest?.data?.data?.data || [];

	const commandItems = useMemo(() => {
		const items = data.map((item: SearchEntry) => {
			const key = item[valueKey];
			const label = item[labelKey];

			return (
				<Command.Item key={key} onSelect={() => onSelect(item)}>
					{label}
				</Command.Item>
			);
		});

		return items;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, labelKey, valueKey]);

	const onSelect = (nextValue: SearchEntry) => {
		setValue(nextValue);
		onChange(nextValue);
		setMenuOpen(false);
	};

	return (
		<DropdownMenu.Root open={isMenuOpen} onOpenChange={setMenuOpen}>
			<DropdownMenu.Trigger>
				<Text>{value[labelKey] || 'no value'}</Text>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<Command>
					<div>
						<Command.Input value={searchQuery} onValueChange={setSearchQuery} asChild>
							<TextField.Root>
								<TextField.Slot>
									<MagnifyingGlassIcon aria-hidden width="20px" height="20px" />
								</TextField.Slot>

								<TextField.Input
									ref={testRef}
									id="email"
									type="email"
									required
									placeholder="E-Mail"
									autoComplete="email"
									radius="small"
									size="1"
								/>
							</TextField.Root>
						</Command.Input>
					</div>

					<Command.List>{commandItems}</Command.List>
				</Command>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

SearchSelect.defaultProps = {
	onChange: () => {},
	labelKey: 'name',
	valueKey: 'id'
};

export default SearchSelect;
