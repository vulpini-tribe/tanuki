import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useSearch = (searchQuery: string = '', endpoint: string = '') => {
	const request = useQuery({
		queryKey: [endpoint, searchQuery],
		queryFn: () =>
			axios({
				method: 'get',
				url: `${endpoint}?query=${searchQuery}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	return request;
};

export default useSearch;
