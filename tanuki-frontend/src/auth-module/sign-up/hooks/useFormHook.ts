import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import yup from '@yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { FormFields, FormKeys } from '../sign-up.d';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.ascii('You can use ASCII symbols only')
		.email('Please enter a valid email address')
		.required("E-Mail couldn't be empty"),
	password: yup.string().required('Password is required')
});

const useFormHook = () => {
	const { control, register, handleSubmit, formState, trigger, setError, clearErrors, getValues, setValue } =
		useForm<FormFields>({
			resolver: yupResolver(schema)
		});

	useEffect(() => {
		clearErrors();
	}, []);

	return {
		name: register('name'),
		email: register('email'),
		password: register('password'),

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
