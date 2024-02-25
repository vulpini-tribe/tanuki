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

	activity_rate: yup.number().required(''),
	goal: yup.number().required(''),
	per_week: yup.number().required(''),

	name: yup.string().required('Name is required'),
	dob: yup.date().required('Date of birth is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
	password_repeat: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

const useFormHook = () => {
	const { control, register, handleSubmit, formState, trigger, setError, clearErrors, getValues } = useForm<FormFields>(
		{
			resolver: yupResolver(schema)
		}
	);

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
