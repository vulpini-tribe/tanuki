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

	const carbsCalories = nutrients.carbs * 4;
	const fatsCalories = nutrients.fats * 9;
	const proteinsCalories = nutrients.proteins * 4;

	const consumedCalories = carbsCalories + fatsCalories + proteinsCalories;

	const overEatenLeft = (dayData.max_calories / consumedCalories) * 100;
	const isOverEaten = consumedCalories > dayData.max_calories;
	const maxCalories = isOverEaten ? consumedCalories : dayData.max_calories;

	const coef = isOverEaten ? overEatenLeft : 100;
	const carbsWidth = (carbsCalories / maxCalories) * coef;
	const fatsWidth = (fatsCalories / maxCalories) * coef;
	const proteinsWidth = (proteinsCalories / maxCalories) * coef;

	return (
		<Root>
			<Text weight="bold">
				Consumed {consumedCalories.toFixed(0)} / {dayData.max_calories?.toFixed(0)} calories
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
