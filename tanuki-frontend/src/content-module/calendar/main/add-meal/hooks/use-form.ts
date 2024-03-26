import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import yup from '@yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormFields = {
	name: string;
	calories: number;
	proteins?: number;
	fats?: number;
	carbs?: number;
	weight: number;
	icon?: string;
	color?: string;
};

type FormKeys = keyof FormFields;

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	calories: yup.number().required('Calories is required').min(0, 'Calories must be greater than 0'),
	proteins: yup.number(),
	fats: yup.number(),
	carbs: yup.number(),
	weight: yup.number().required('Weight is required').min(0, 'Weight must be greater than 0'),
	icon: yup.string(),
	color: yup.string()
});

const useFormHook = () => {
	const { register, handleSubmit, formState, trigger, setError, clearErrors, getValues, setValue, resetField } =
		useForm<FormFields>({
			resolver: yupResolver(schema)
		});

	useEffect(() => {
		clearErrors();
	}, []);

	const calcCalories = () => {
		const { proteins, fats, carbs, weight } = getValues();
		const calories = ((proteins || 0) * 4 + (fats || 0) * 9 + (carbs || 0) * 4) * (weight / 100);

		if (calories) {
			setValue('calories', calories);
		}
	};

	return {
		name: register('name'),
		calories: register('calories', {
			onChange: () => {
				resetField('carbs');
				resetField('fats');
				resetField('proteins');
			}
		}),
		proteins: register('proteins', {
			onChange: () => {
				calcCalories();
			}
		}),
		fats: register('fats', {
			onChange: () => {
				calcCalories();
			}
		}),
		carbs: register('carbs', {
			onChange: () => {
				calcCalories();
			}
		}),
		weight: register('weight', {
			onChange: () => {
				calcCalories();
			}
		}),
		icon: register('icon'),
		color: register('color'),

		submit: handleSubmit,
		setError,
		setValue,
		getValues,
		errors: formState.errors,
		calcCalories,
		revalidate: () => {
			const fields = Object.keys(formState.dirtyFields);

			if (fields.length) {
				trigger(fields as FormKeys[]);
			}
		}
	};
};

export default useFormHook;
