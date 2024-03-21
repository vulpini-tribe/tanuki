import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useSearch = () => {
	const request = useQuery({
		queryKey: ['/search-food'],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/food/search?query=fel`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	return request;
};

export default useSearch;
