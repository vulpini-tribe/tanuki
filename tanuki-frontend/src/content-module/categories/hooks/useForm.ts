import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import yup from '@yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import type { FormFields, FormKeys } from '../sign-in.d';

type FormFields = {
	name: string;
	description: string;
	color: string;
	icon: string;
};

type FormKeys = keyof FormFields;

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	description: yup.string().required('Description is required'),
	color: yup.string().required('Color is required'),
	icon: yup.string().required('Icon is required')
});

const useFormHook = () => {
	const { register, handleSubmit, formState, trigger, setError, clearErrors, getValues } = useForm<FormFields>({
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		clearErrors();
	}, []);

	return {
		name: register('name'),
		description: register('description'),
		color: register('color'),
		icon: register('icon'),
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
