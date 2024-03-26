import axios from '@axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { setFullHistoryEntry } from '../../store';

const useGetHistoryEntry = (day: string) => {
	const request = useQuery({
		queryKey: ['/history/id', day],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/history/${day}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 0
	});

	useEffect(() => {
		if (!request.isSuccess) return;

		setFullHistoryEntry({ day, data: request.data?.data?.data || {} });
	}, [request.isSuccess]);

	return request;
};

export default useGetHistoryEntry;
