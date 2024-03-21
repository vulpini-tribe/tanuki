import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import toast from 'react-hot-toast';
import axios, { getErrCode, getErrMessage } from '@axios';

const useValidateRequest = () => {
	const token = useRef<string>();

	const { isFetching, error, refetch } = useQuery({
		queryKey: ['/auth/validate'],
		queryFn: () =>
			axios({
				method: 'post',
				url: `/auth/validate`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: { token: token.current }
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	useEffect(() => {
		const errorCode = getErrCode(error);

		if (errorCode === 500) {
			toast.error('Internal Server Error');
		}
	}, [error]);

	const fetchData = (newToken: string) => {
		token.current = newToken;
		refetch();
	};

	return {
		error: error ? getErrMessage(error) : undefined,
		isFetching,
		fetch: fetchData
	};
};

export default useValidateRequest;
