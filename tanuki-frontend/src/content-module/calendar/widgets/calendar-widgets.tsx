import React, { useMemo } from 'react';
import { useStoreMap } from 'effector-react';
import { $calendarStore, dayDataSelector } from '../store';

import { ParentSize } from '@visx/responsive';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';

import { Heading, Box, Grid } from '@radix-ui/themes';

import { SharedWidgets } from '../../shared';

import { WidgetWrap } from './widgets.styles';

const DonutChart = ({ width, height }) => {
	const dayData = useStoreMap($calendarStore, dayDataSelector);

	const nutrients = useMemo(() => {
		const consumedFood = dayData.consumed_food || [];

		const totalCarbs = consumedFood.reduce((acc, food) => {
			return acc + food.carbs_100 * (food.portion_weight / 100);
		}, 0);

		const totalFats = consumedFood.reduce((acc, food) => {
			return acc + food.fat_100 * (food.portion_weight / 100);
		}, 0);

		const totalProtein = consumedFood.reduce((acc, food) => {
			return acc + food.protein_100 * (food.portion_weight / 100);
		}, 0);

		return [
			{ label: 'carbs', value: totalCarbs },
			{ label: 'fats', value: totalFats },
			{ label: 'protein', value: totalProtein }
		];
	}, [dayData.consumed_food]);

	const getBrowserColor = scaleOrdinal({
		domain: nutrients.map((d) => d.label),
		range: ['var(--blue-6)', 'var(--amber-6)', 'var(--violet-6)']
	});

	const donutThickness = 40;
	const margin = { top: 10, right: 10, bottom: 10, left: 10 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;

	return (
		<svg width={width} height={height}>
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				<Pie data={nutrients} pieValue={(d) => d.value} outerRadius={radius} innerRadius={radius - donutThickness}>
					{({ arcs, path, pie }) => (
						<g>
							{arcs.map((arc, i) => (
								<g key={`pie-arc-${i}`}>
									<path className={`arc${i}`} d={path(arc)} fill={getBrowserColor(arc.data.label)} />
								</g>
							))}
						</g>
					)}
				</Pie>
			</Group>
		</svg>
	);
};

const CalendarWidgets = () => {
	const dayData = useStoreMap($calendarStore, dayDataSelector);

	return (
		<SharedWidgets>
			<Grid p="4" gap="2" mr="1" ml="1" asChild>
				<WidgetWrap>
					<Heading>Nutrients</Heading>

					<Box style={{ width: '100%', height: '200px' }}>
						<ParentSize>{(parent) => <DonutChart width={parent.width} height={parent.height} />}</ParentSize>
					</Box>
				</WidgetWrap>
			</Grid>

			{Boolean(dayData.weight) && (
				<Grid mt="6" p="4" gap="2" mr="1" ml="1" asChild>
					<WidgetWrap>
						<Heading>Weight</Heading>
						{dayData.weight.toFixed(2)} kg
					</WidgetWrap>
				</Grid>
			)}
		</SharedWidgets>
	);
};

export default CalendarWidgets;
