import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useGetCategory = (categoryId: string) => {
	const request = useQuery({
		queryKey: ['/categories/id', categoryId],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/categories/${categoryId}`
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

export default useGetCategory;
