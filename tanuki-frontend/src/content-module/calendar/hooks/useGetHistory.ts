import axios from '@axios';
import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import { $calendarStore } from '../store';

const useGetCategories = () => {
	const { from, to } = useUnit($calendarStore);

	const request = useQuery({
		queryKey: ['/history'],
		queryFn: () =>
			axios({
				method: 'GET',
				url: `/history?from=${from}&to=${to}`
			}),
		gcTime: 0,
		enabled: false,
		retry: 0
	});

	return request;
};

export default useGetCategories;
