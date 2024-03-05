import { useQuery } from '@tanstack/react-query';

import axios from '@axios';
import { useError } from '@hooks';

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

	useError({
		error,
		errorUpdatedAt,
		data,
		dataUpdatedAt
	});

	return {
		isFetching,
		fetch: refetch
	};
};

export default useSignUpRequest;
