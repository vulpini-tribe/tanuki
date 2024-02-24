import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import toast from 'react-hot-toast';
import axios, { getErrCode } from '@axios';

import type { FormFields } from './sign-in.d';
import type { UseFormSetError, UseFormGetValues } from 'react-hook-form';

const useSignInReq = (setError: UseFormSetError<FormFields>, getValues: UseFormGetValues<FormFields>) => {
	const { email, password } = getValues();

	const { isFetching, error, refetch } = useQuery({
		queryKey: ['/api/auth', password, email],
		queryFn: () =>
			axios({
				method: 'post',
				url: '/api/auth',
				data: { email, password }
			}),
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

export default useSignInReq;
