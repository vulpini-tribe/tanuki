import React from 'react';
import { DateTime } from 'luxon';
import { useUnit } from 'effector-react';

import { MIN_DATE } from '@pages/feed/constants';
import $feedStore, { setFrom, setTo } from '@pages/feed/store';

import { Grid, Flex, Badge, TextField } from '@radix-ui/themes';

const today = DateTime.now();

const HeaderContent = () => {
	const { from, to } = useUnit($feedStore);

	const onFromHd = (e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value);
	const onToHd = (e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value);

	const onAllTimeHd = () => {
		setFrom(today.toISODate());
		setTo(MIN_DATE);
	};

	const onYearHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ years: 1 }).toISODate());
	};

	const onHalfYearHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ months: 6 }).toISODate());
	};

	const onMonthHd = () => {
		setFrom(today.toISODate());
		setTo(today.minus({ months: 1 }).toISODate());
	};

	return (
		<>
			<Grid p="2" flow="column" gap="3" columns="1fr 1fr">
				<TextField.Input type="date" placeholder="From" variant="soft" color="gray" value={from} onChange={onFromHd} />
				<TextField.Input type="date" placeholder="To" variant="soft" color="gray" value={to} onChange={onToHd} />
			</Grid>

			<Flex p="2" gap="1" wrap="wrap">
				<Badge onClick={onAllTimeHd}>All time</Badge>
				<Badge onClick={onYearHd}>Year</Badge>
				<Badge onClick={onHalfYearHd}>Half-year</Badge>
				<Badge onClick={onMonthHd}>Month</Badge>
			</Flex>
		</>
	);
};

export default HeaderContent;
