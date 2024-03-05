import axios from 'axios';

type ApiError = {
	type: string;
	title: string;
	status: number;
	detail: string;
	instance: string;
	errors: object;
};

function isApiErrorResponse(res: unknown): res is ApiError {
	if (typeof res !== 'object' || res === null) {
		return false;
	}

	const isDefaultErrorStruct =
		res && 'type' in res && 'title' in res && 'status' in res && 'detail' in res && 'instance' in res;
	const isRustErrorStruct = res && 'errors' in res;

	return isRustErrorStruct || isDefaultErrorStruct;
}

export const getErrMessage = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return 'Unknown error';
	}

	if (!error.response) {
		return error.message;
	}

	if (!isApiErrorResponse(error.response.data)) {
		return error.message;
	}

	return error.response.data.detail || error.response.data.errors;
};

export const getErrCode = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return 'Unknown error';
	}

	if (!error.response) return error.status;

	if (error.response && error.response.status) {
		return error.response.status;
	}

	if (!isApiErrorResponse(error.response.data)) {
		return error.response.status;
	}

	return error.response.data.status;
};

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const instance = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

export default instance;
