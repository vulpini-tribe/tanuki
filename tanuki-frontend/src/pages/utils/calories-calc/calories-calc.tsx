import React, { useState } from 'react';

const genders = [
	{ value: 'female', label: 'Женщина' },
	{ value: 'male', label: 'Мужчина' }
];

const FAT = 9.29;

const ACTIVITY_RATES = [
	{ value: 1.2, label: 'Сидячий образ жизни' },
	{ value: 1.375, label: 'Небольшая активность' },
	{ value: 1.55, label: 'Умеренная активность' },
	{ value: 1.725, label: 'Высокая активность' },
	{ value: 1.9, label: 'Очень высокая активность' }
];

type BMR = {
	sex: 'male' | 'female';
	weight: number;
	height: number;
	age: number;
};

const calcBMR = (config: BMR): number => {
	const { sex, weight, height, age } = config;

	const bmr =
		sex === 'female'
			? 665.1 + 9.563 * weight + 1.85 * height - 4.676 * age
			: 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;

	return bmr;
};

const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

const CaloriesCalc = () => {
	const [sex, setSex] = useState('female');
	const [weight, setWeight] = useState(64.3);
	const [age, setAge] = useState(33);
	const [height, setHeight] = useState(170);
	const [activity, setActivity] = useState(ACTIVITY_RATES[2].value);
	const [loss, setLoss] = useState(400);

	const onWeightChange = (e) => {
		const nextWeight = Number.parseFloat(e.target.value, 10);

		setWeight(nextWeight);
	};

	const onAgeChange = (e) => {
		const nextAge = Number.parseInt(e.target.value, 10);

		setAge(nextAge);
	};

	const onHeightChange = (e) => {
		const nextHeight = Number.parseFloat(e.target.value, 10);

		setHeight(nextHeight);
	};

	const onSexChange = (e) => {
		setSex(e.target.value);
	};

	const onActivityChange = (e) => {
		const nextActivity = Number.parseFloat(e.target.value, 10);

		setActivity(nextActivity);
	};

	const onLossChange = (e) => {
		const nextLoss = Number.parseInt(e.target.value, 10);

		setLoss(nextLoss);
	};

	const BMR = calcBMR({ sex, weight, height, age, activity });

	return (
		<div>
			<h1>Калькулятор калорий</h1>

			<h3>Величина Основного Обмена: {round(BMR)} ккал</h3>

			<select name="sex" onChange={onSexChange} value={sex}>
				{genders.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<select name="activity" value={activity} onChange={onActivityChange}>
				{ACTIVITY_RATES.map(({ value, label }) => (
					<option key={value} value={value}>
						{label} ({value})
					</option>
				))}
			</select>

			<label>
				Вес:
				<input type="number" value={weight} min={3} max={300} step={0.1} placeholder="65" onChange={onWeightChange} />
			</label>

			<label>
				Возраст:
				<input type="number" value={age} min={0} max={120} step={1} placeholder="25" onChange={onAgeChange} />
			</label>

			<label>
				Рост:
				<input
					type="number"
					value={height}
					min={100}
					max={250}
					step={0.1}
					placeholder="170"
					onChange={onHeightChange}
				/>
			</label>

			<h3>Суточная потребность в калориях: {round(BMR * activity)}</h3>

			<label>
				Потеря жира в неделю (грамм):
				<input type="number" value={loss} placeholder="500g" onChange={onLossChange} step={10} />
			</label>

			<h3>Рекомендуемый каллораж: {round(BMR * activity - (loss * FAT) / 7)}</h3>
		</div>
	);
};

export default CaloriesCalc;
