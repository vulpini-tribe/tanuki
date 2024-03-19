import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

const useRequestCategories = (values) => {
	const request = useQuery({
		queryKey: ['/categories'],
		queryFn: () =>
			axios({
				method: 'post',
				url: `/categories`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: values
			}),
		gcTime: 0,
		enabled: false,
		retry: 0
	});

	return request;
};

export default useRequestCategories;
