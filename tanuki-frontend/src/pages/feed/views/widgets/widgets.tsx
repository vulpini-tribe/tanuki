import React, { useMemo } from 'react';
import { useStoreMap } from 'effector-react';

import $feedStore, { dayDataSelector } from '@pages/feed/store';

import { Text } from '@radix-ui/themes';
import Root, { NutrientsWrap, Fats, Carbs, Proteins, Overeat } from './widgets.styles';

const Widgets = () => {
	const dayData = useStoreMap($feedStore, dayDataSelector);

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

		return { carbs: totalCarbs, fats: totalFats, proteins: totalProtein };
	}, [dayData.meals]);

	const carbsCalories = useMemo(() => nutrients.carbs * 4, [nutrients.carbs]);
	const fatsCalories = useMemo(() => nutrients.fats * 9, [nutrients.fats]);
	const proteinsCalories = useMemo(() => nutrients.proteins * 4, [nutrients.proteins]);

	const consumedCalories = carbsCalories + fatsCalories + proteinsCalories;
	const maxCaloriesRaw = Math.abs(dayData.max_calories);

	const overEatenLeft = (maxCaloriesRaw / consumedCalories) * 100;
	const isOverEaten = consumedCalories > maxCaloriesRaw;
	const maxCaloriesLocal = isOverEaten ? consumedCalories : maxCaloriesRaw;

	const coef = isOverEaten ? overEatenLeft : 100;
	const carbsWidth = (carbsCalories / maxCaloriesLocal) * coef;
	const fatsWidth = (fatsCalories / maxCaloriesLocal) * coef;
	const proteinsWidth = (proteinsCalories / maxCaloriesLocal) * coef;

	return (
		<Root>
			<Text weight="bold">
				Consumed {consumedCalories.toFixed(0)} / {maxCaloriesRaw?.toFixed(0)} calories
			</Text>
			<NutrientsWrap>
				<Proteins style={{ width: `${proteinsWidth}%` }} />
				<Fats style={{ width: `${fatsWidth}%`, left: `${proteinsWidth}%` }} />
				<Carbs style={{ width: `${carbsWidth}%`, left: `${proteinsWidth + fatsWidth}%` }} />
				{isOverEaten && <Overeat style={{ left: `${overEatenLeft}%`, right: 0 }} />}
			</NutrientsWrap>
		</Root>
	);
};

export default Widgets;
