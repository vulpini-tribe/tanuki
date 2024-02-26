import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import toast from 'react-hot-toast';
import axios, { getErrCode } from '@axios';

import type { FormFields } from '../sign-up.d';
import type { UseFormSetError, UseFormGetValues } from 'react-hook-form';

const useSignUpRequest = (setError: UseFormSetError<FormFields>, getValues: UseFormGetValues<FormFields>) => {
	const values = getValues();

	const { isFetching, error, refetch } = useQuery({
		queryKey: ['/api/register'],
		queryFn: () =>
			axios({
				method: 'post',
				url: '/api/register',
				data: values
			}),
		gcTime: 0,
		enabled: false,
		retry: 3
	});

	useEffect(() => {
		const errorCode = getErrCode(error);

		if (errorCode === 500) {
			toast.error('Internal Server Error');
		}
	}, [error]);

	return {
		isFetching,
		fetch: refetch
	};
};

export default useSignUpRequest;
