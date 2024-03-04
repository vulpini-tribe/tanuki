import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import toast from 'react-hot-toast';
import axios, { getErrCode } from '@axios';

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useValidateRequest = () => {
	const rrrr = useRef();

	const { isFetching, error, refetch } = useQuery({
		queryKey: ['/auth/validate'],
		queryFn: () =>
			axios({
				method: 'post',
				url: `${apiUrl}/auth/validate`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: { token: rrrr.current }
			}),
		gcTime: 10,
		enabled: false,
		retry: 3
	});

	useEffect(() => {
		const errorCode = getErrCode(error);

		if (errorCode === 500) {
			toast.error('Internal Server Error');
		}
	}, [error]);

	const fetchData = (newToken: string) => {
		rrrr.current = newToken;
		refetch();
	};

	return {
		isFetching,
		fetch: fetchData
	};
};

export default useValidateRequest;
