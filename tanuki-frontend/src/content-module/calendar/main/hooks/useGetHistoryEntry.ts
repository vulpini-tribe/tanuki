import axios from '@axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { setFullHistoryEntry } from '../../store';

const useGetHistoryEntry = (historyId: string) => {
	const request = useQuery({
		queryKey: ['/history/id', historyId],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/history/${historyId}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 0
	});

	useEffect(() => {
		if (!request.isSuccess) return;

		setFullHistoryEntry({ id: historyId, data: request.data?.data?.data || {} });
	}, [request.isSuccess]);

	return request;
};

export default useGetHistoryEntry;
