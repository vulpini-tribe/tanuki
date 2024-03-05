import { useEffect } from 'react';

import toast from 'react-hot-toast';
import { getErrCode, getErrMessage } from '@axios';
import type { AxiosResponse } from 'axios';

import { toggleAuth } from '@src/auth-module/store';

type Props = {
	error: unknown;
	errorUpdatedAt: number;
	data: AxiosResponse<{ info: object }, unknown> | undefined;
	dataUpdatedAt: number;
};

const useError = ({ error, errorUpdatedAt, data, dataUpdatedAt }: Props) => {
	useEffect(() => {
		if (!errorUpdatedAt) return;

		const errorCode = getErrCode(error);
		if (errorCode === 401) {
			toggleAuth(false);
		}

		const errorMessages = getErrMessage(error);
		if (!errorMessages) return;

		const messages = typeof errorMessages === 'string' ? [errorMessages] : Object.values(errorMessages);

		messages.forEach((message: string) => {
			toast.error(message);
		});
	}, [error, errorUpdatedAt]);

	useEffect(() => {
		if (!data || !dataUpdatedAt) return;

		if (data.status === 200) {
			const messages = Object.values(data.data?.info ?? {});

			messages.forEach((message) => {
				toast.success(message as string);
			});
		}
	}, [data, dataUpdatedAt]);
};

export default useError;
