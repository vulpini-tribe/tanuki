import axios from '@axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUnit } from 'effector-react';
import $feedStore, { setHistoryEntries } from '../store';

const useGetCategories = () => {
	const { from, to } = useUnit($feedStore);

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
