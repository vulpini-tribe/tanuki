import axios from '@axios';
import { useQuery } from '@tanstack/react-query';

type ParamsT = {
	from: string; // YYYY-MM-DD
	to: string;
};

const useGetCategories = ({ from, to }: ParamsT) => {
	const request = useQuery({
		queryKey: ['/history'],
		queryFn: () =>
			axios({
				method: 'get',
				url: `/history?from=${from}&to=${to}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 1
	});

	return request;
};

export default useGetCategories;
