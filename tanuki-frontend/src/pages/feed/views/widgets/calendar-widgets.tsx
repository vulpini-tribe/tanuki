import React, { useMemo } from 'react';
import { useStoreMap } from 'effector-react';
import $feedStore, { dayDataSelector } from '@pages/feed/store';
import { useWindowSize } from 'usehooks-ts';

import { ParentSize } from '@visx/responsive';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';

import { Heading, Box, Grid, Text, ScrollArea } from '@radix-ui/themes';

import Root, { WidgetWrap, Path } from './widgets.styles';

const DonutChart = ({ width, height }: { width: number; height: number }) => {
	const dayData = useStoreMap($feedStore, dayDataSelector);

	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		scroll: true
	});

	const nutrients = useMemo(() => {
		const consumedFood = dayData.meals || [];

		const totalCarbs = consumedFood.reduce((acc, food) => {
			return acc + food.carbs * (food.weight / 100);
		}, 0);

		const totalFats = consumedFood.reduce((acc, food) => {
			return acc + food.fats * (food.weight / 100);
		}, 0);

		const totalProtein = consumedFood.reduce((acc, food) => {
			return acc + food.proteins * (food.weight / 100);
		}, 0);

		return [
			{ label: 'carbs', value: totalCarbs.toFixed(0) },
			{ label: 'fats', value: totalFats.toFixed(0) },
			{ label: 'protein', value: totalProtein.toFixed(0) }
		];
	}, [dayData.meals]);

	const getNutrientsColor = useMemo(() => {
		return scaleOrdinal({
			domain: nutrients.map((d) => d.label),
			range: ['var(--blue-6)', 'var(--amber-6)', 'var(--violet-6)']
		});
	}, [nutrients]);

	const donutThickness = 40;
	const margin = { top: 10, right: 10, bottom: 10, left: 10 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;

	return (
		<>
			<svg width={width} height={height} ref={containerRef}>
				<Group top={centerY + margin.top} left={centerX + margin.left}>
					<Pie data={nutrients} pieValue={(d) => d.value} outerRadius={radius} innerRadius={radius - donutThickness}>
						{({ arcs, path, pie }) => {
							return (
								<g>
									{arcs.map((arc, i) => {
										const [x, y] = path.centroid(arc);

										return (
											<g key={`pie-arc-${i}`}>
												<Path
													d={path(arc) || ''}
													fill={getNutrientsColor(arc.data)}
													onMouseEnter={() =>
														showTooltip({
															tooltipData: arc.data,
															tooltipLeft: x,
															tooltipTop: y
														})
													}
													onMouseLeave={hideTooltip}
												/>
											</g>
										);
									})}
								</g>
							);
						}}
					</Pie>
				</Group>
			</svg>

			{tooltipOpen && (
				<div
					style={{
						position: 'absolute',
						top: (tooltipTop || 0) + height / 2,
						left: (tooltipLeft || 0) + width / 2,
						pointerEvents: 'none',
						background: 'rgba(0,0,0,0.3)'
					}}
				>
					{tooltipData?.label ?? ''}: {tooltipData?.value ?? ''}
				</div>
			)}
		</>
	);
};

const CalendarWidgets = () => {
	const { width = 0 } = useWindowSize();
	const dayData = useStoreMap($feedStore, dayDataSelector);

	const isSmall = width <= 1280;

	if (isSmall) {
		return (
			<Root>
				<ScrollArea scrollbars="horizontal" style={{ height: '100%' }}>
					<Grid flow="column" mt="3" gap="3" ml="1" mr="1" columns="1fr 1fr 1fr">
						<Box p="4" asChild>
							<WidgetWrap style={{ height: 200 }}>
								<ParentSize>{(parent) => <DonutChart width={parent.width} height={parent.height} />}</ParentSize>
							</WidgetWrap>
						</Box>

						<Box p="4" asChild>
							<WidgetWrap>
								<Heading size="4" mb="3" color="gray">
									Consumed
								</Heading>
								<Text size="6">{dayData.calories} kcal</Text>
							</WidgetWrap>
						</Box>

						<Box p="4" asChild>
							<WidgetWrap>
								<Heading size="4" mb="3" color="gray">
									Weight
								</Heading>
								<Text size="6">{dayData.weight?.toFixed(2)} kg</Text>
							</WidgetWrap>
						</Box>
					</Grid>
				</ScrollArea>
			</Root>
		);
	}

	return (
		<Root>
			<ScrollArea scrollbars="vertical" style={{ height: '100%' }}>
				<Grid p="4" gap="3" mr="1" ml="1" asChild>
					<WidgetWrap>
						<Heading size="4" color="gray">
							Nutrients
						</Heading>

						<Box style={{ width: '100%', height: '200px' }}>
							<ParentSize>{(parent) => <DonutChart width={parent.width} height={parent.height} />}</ParentSize>
						</Box>
					</WidgetWrap>
				</Grid>

				<Grid flow="column" mt="3" gap="3" ml="1" mr="1" columns="1fr 1fr">
					<Box p="4" asChild>
						<WidgetWrap>
							<Heading size="4" mb="3" color="gray">
								Weight
							</Heading>
							<Text size="6">{dayData.weight?.toFixed(2)} kg</Text>
						</WidgetWrap>
					</Box>

					<Box p="4" asChild>
						<WidgetWrap>
							<Heading size="4" mb="3" color="gray">
								Consumed
							</Heading>
							<Text size="6">{dayData.calories} kcal</Text>
						</WidgetWrap>
					</Box>
				</Grid>
			</ScrollArea>
		</Root>
	);
};

export default CalendarWidgets;
