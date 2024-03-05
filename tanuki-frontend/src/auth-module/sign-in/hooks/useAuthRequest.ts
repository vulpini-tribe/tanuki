import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from '@axios';
import { useError } from '@hooks';
import { toggleAuth, setUserId } from '../../store';

import type { FormFields } from '../sign-in.d';
import type { UseFormSetError, UseFormGetValues } from 'react-hook-form';

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useAuthRequest = (setError: UseFormSetError<FormFields>, getValues: UseFormGetValues<FormFields>) => {
	const { email, password } = getValues();

	const { isFetching, error, refetch, errorUpdatedAt, dataUpdatedAt, data } = useQuery({
		queryKey: ['/api/auth/sign-in', password, email],
		queryFn: () =>
			axios({
				method: 'post',
				url: `${apiUrl}/auth/sign-in`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: { email, password },
				withCredentials: true
			}),
		enabled: false,
		retry: 0
	});

	useEffect(() => {
		if (!dataUpdatedAt) {
			return;
		}

		if (data.status === 200) {
			toggleAuth(true);
			setUserId(data?.data?.data?.user_id);
		}
	}, [dataUpdatedAt]);

	useError({ error, errorUpdatedAt, data, dataUpdatedAt });

	return {
		isFetching,
		fetch: refetch
	};
};

export default useAuthRequest;
