import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import toast from 'react-hot-toast';
import axios, { getErrCode, getErrMessage } from '@axios';

import type { FormFields } from '../sign-up.d';
import type { UseFormSetError, UseFormGetValues } from 'react-hook-form';

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useSignUpRequest = (setError: UseFormSetError<FormFields>, getValues: UseFormGetValues<FormFields>) => {
	const values = getValues();

	const { isFetching, error, refetch, data, errorUpdatedAt, dataUpdatedAt } = useQuery({
		queryKey: ['/auth/sign-up'],
		queryFn: () =>
			axios({
				method: 'post',
				url: `${apiUrl}/auth/sign-up`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: values
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	useEffect(() => {
		if (!errorUpdatedAt) return;

		const errorMessages = getErrMessage(error);
		if (!errorMessages) return;

		const messages = typeof errorMessages === 'string' ? [errorMessages] : Object.values(errorMessages);

		messages.forEach((message: string) => {
			toast.error(message);
		});
	}, [errorUpdatedAt]);

	useEffect(() => {
		if (!data || !dataUpdatedAt) return;

		if (data.status === 200) {
			const messages = Object.values(data.data.info);

			messages.forEach((message) => {
				toast.success(message as string);
			});
		}
	}, [dataUpdatedAt]);

	return {
		isFetching,
		fetch: refetch
	};
};

export default useSignUpRequest;
