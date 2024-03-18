import axios from '@axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import { $calendarStore, setHistoryEntries } from '../store';

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

	useEffect(() => {
		if (!request.isSuccess) return;

		setHistoryEntries(request.data?.data?.data || []);
	}, [request.isSuccess]);

	return request;
};

export default useGetCategories;
