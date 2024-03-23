import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useSearch = (searchQuery: string = '') => {
	const request = useQuery({
		queryKey: ['/search-food', searchQuery],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/food/search?query=${searchQuery}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
		// staleTime: 500
	});

	return request;
};

export default useSearch;
