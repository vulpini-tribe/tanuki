import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import yup from '@yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { FormFields, FormKeys } from './sign-in.d';

const schema = yup.object().shape({
	email: yup
		.string()
		.ascii('You can use ASCII symbols only')
		.email('Please enter a valid email address')
		.required("E-Mail couldn't be empty"),

	password: yup.string().min(6, 'Password shall be at least 6 chars long').required('Password is required')
});

const useFormHook = () => {
	const { register, handleSubmit, formState, trigger, setError, clearErrors, getValues } = useForm<FormFields>({
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		clearErrors();
	}, []);

	return {
		email: register('email'),
		password: register('password'),
		submit: handleSubmit,
		setError,
		getValues,
		errors: formState.errors,
		revalidate: () => {
			const fields = Object.keys(formState.dirtyFields);

			if (fields.length) {
				trigger(fields as FormKeys[]);
			}
		}
	};
};

export default useFormHook;
