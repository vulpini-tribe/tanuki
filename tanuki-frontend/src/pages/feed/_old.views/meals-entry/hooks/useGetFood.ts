import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useGetFoodEntry = (foodId: string) => {
	const request = useQuery({
		queryKey: ['/food/id', foodId],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/food/${foodId}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 0
	});

	return {
		...request,
		data: request.data?.data?.data ?? undefined
	};
};

export default useGetFoodEntry;
