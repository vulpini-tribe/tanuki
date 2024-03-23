import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@react-hooks-library/core';

import { Command } from 'cmdk';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { DropdownMenu, Text, TextField } from '@radix-ui/themes';

import useSearch from './useSearch';
import type { Props, SearchEntry } from './search-select.d';

const SearchSelect = ({ onChange, labelKey, valueKey, endpoint }: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [value, setValue] = useState<SearchEntry>({});

	const [searchQuery, setSearchQuery] = useState('');
	const debouncedQuery = useDebounce(searchQuery, 500);

	const searchRequest = useSearch(debouncedQuery, endpoint);

	useEffect(() => {
		if (!debouncedQuery) return;

		searchRequest.refetch();
	}, [debouncedQuery]);

	useEffect(() => {
		if (!isMenuOpen) return;

		window.setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	}, [isMenuOpen]);

	const commandItems = useMemo(() => {
		const response = searchRequest.data?.data?.data || [];

		const items = response.map((item: SearchEntry) => {
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
	}, [searchRequest.data, labelKey, valueKey]);

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

			<DropdownMenu.Content style={{ marginTop: '-25px' }}>
				<Command>
					<div>
						<Command.Input value={searchQuery} onValueChange={setSearchQuery} asChild>
							<TextField.Root>
								<TextField.Slot>
									<MagnifyingGlassIcon aria-hidden />
								</TextField.Slot>

								<TextField.Input ref={inputRef} placeholder="Search" radius="small" size="2" />
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
