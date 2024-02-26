import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import yup from '@yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { FormFields, FormKeys } from '../sign-up.d';

const schema = yup.object().shape({
	weight: yup.number().required('Weight is required'),
	height: yup.number().required('Height is required'),
	age: yup.number().required('Age is required'),
	unit: yup.string().required(''),
	hormonal_sex: yup.string().required(''),

	activity_rate: yup.string().required(''),
	goal: yup.string().required(''),
	per_week: yup.number().required(''),

	name: yup.string().required('Name is required'),
	dob: yup.string().required('Date of birth is required'), // 1999-02-14
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
	password_repeat: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

const now = new Date();
const useFormHook = () => {
	const { control, register, handleSubmit, formState, trigger, setError, clearErrors, getValues, setValue } =
		useForm<FormFields>({
			resolver: yupResolver(schema),
			defaultValues: {
				hormonal_sex: 'female',
				activity_rate: 'light',
				goal: 'loss',
				per_week: 200,
				dob: now.toISOString().split('T')[0],
				unit: 'metric'
			}
		});

	useEffect(() => {
		clearErrors();
	}, []);

	return {
		weight: register('weight'),
		height: register('height'),
		age: register('age'),
		unit: register('unit'),
		hormonal_sex: register('hormonal_sex'),

		activity_rate: register('activity_rate'),
		goal: register('goal'),
		per_week: register('per_week'),

		name: register('name'),
		dob: register('dob'),
		email: register('email'),
		password: register('password'),
		password_repeat: register('password_repeat'),

		submit: handleSubmit,
		setError,
		getValues,
		setValue,
		isValid: formState.isValid,
		errors: formState.errors,
		control,
		revalidate: () => {
			const fields = Object.keys(formState.dirtyFields);

			if (fields.length) {
				trigger(fields as FormKeys[]);
			}
		}
	};
};

export type FormRetT = ReturnType<typeof useFormHook>;

export default useFormHook;
