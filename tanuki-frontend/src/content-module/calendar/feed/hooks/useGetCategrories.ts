import axios, { getErrCode, getErrMessage } from '@axios';
import { useQuery } from '@tanstack/react-query';

const useGetCategories = () => {
	const request = useQuery({
		queryKey: ['/categories'],
		queryFn: () =>
			axios({
				method: 'get',
				url: '/categories'
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	return request;
};

export default useGetCategories;
