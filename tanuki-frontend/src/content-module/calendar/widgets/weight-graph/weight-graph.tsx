import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { DateTime } from 'luxon';

import { extent } from '@visx/vendor/d3-array';
import { useTooltip } from '@visx/tooltip';
import { AreaClosed } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import { $weightGraphStore, setWeightGraph, type WeightEntry } from './store';

import Root from '../widgets.styles';

import mock from './mocks.json';

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

const margin = { top: 0, right: 0, bottom: 0, left: 0 };

const WeightGraph = () => {
	const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip();

	const weightGraphStore = useUnit($weightGraphStore);

	useEffect(() => {
		const formattedData = mock.data.map((entry: any) => {
			return {
				date: DateTime.fromISO(entry.date),
				weight: entry.weight
			};
		});

		setWeightGraph(formattedData);
	}, []);

	return (
		<Root>
			<ParentSize>
				{({ width, height }) => {
					// const width = width - margin.left - margin.right;
					// const height = height - margin.top - margin.bottom;

					const getDate = (d: WeightEntry) => d.date;

					const timeScale = scaleLinear({
						range: [width, 0],
						domain: extent(weightGraphStore.history, getDate),
						nice: true
					});

					const getWeight = (d: WeightEntry) => d.weight;
					const weightScale = scaleLinear({
						range: [height, 0],
						domain: extent(weightGraphStore.history, getWeight),
						nice: true
					});

					return (
						<svg width={width} height={height}>
							<rect x={0} y={0} width={width} height={height} fill="url(#area-background-gradient)" />
							<LinearGradient id="area-background-gradient" from={background} to={background2} />
							<LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />

							<AreaClosed
								strokeWidth={3}
								stroke="url(#area-gradient)"
								fill="url(#area-gradient)"
								yScale={weightScale}
								data={weightGraphStore.history}
								x={(d) => {
									return timeScale(getDate(d)) ?? 0;
								}}
								y={(d) => weightScale(getWeight(d)) ?? 0}
							/>
						</svg>
					);
				}}
			</ParentSize>
		</Root>
	);
};

export default WeightGraph;
