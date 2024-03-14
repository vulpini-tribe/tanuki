import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

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

	// console.log(`[GET] /history/${historyId}:`, request.data);

	return request;
};

export default useGetHistoryEntry;
