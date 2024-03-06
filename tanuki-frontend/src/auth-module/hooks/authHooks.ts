import { configureAuth } from 'react-query-auth';
import toast from 'react-hot-toast';

import axios, { getErrCode } from '@axios';
import { toggleAuth } from '../store';
import { setProfile, clearProfile } from '@src/content-module/profile/store';

type LoginCreds = {
	email: string;
	password: string;
};

type RegisterCreds = {
	name: string;
	email: string;
	password: string;
};

// Get user's profile & check if user has a valid token
const fetchUserRequest = async () => {
	try {
		const request = await axios({ method: 'get', url: `/users/me` });

		if (request.status === 200) {
			toggleAuth(true);

			setProfile({
				id: 'a4075817-f4da-4780-8241-bf22b881e9b3',
				email: 'mail@alena.red',
				avatar_url: 'https://lh3.googleusercontent.com/ogw/AF2bZyhyrF9zZEDVaKiizjQIhIFNpYuJEDDXd_sIqYi8Bw=s64-c-mo',
				nickname: 'Keira',
				units: 'metric',
				language: 'en-US',
				theme: 'light',
				mode: 'loss'
			});
		}

		return request;
	} catch (err) {
		if (getErrCode(err) === 401) {
			toggleAuth(false);
		}

		return err;
	}
};

// Login request
const fetchSignInRequest = async (credentials: LoginCreds) => {
	const request = await axios({
		method: 'post',
		url: `/auth/sign-in`,
		data: credentials
	})
		.then((data) => {
			toast.success('Welcome back');
			toggleAuth(true);
			return data;
		})
		.catch((err) => {
			if (getErrCode(err) === 401) {
				toast.error('Unknown e-mail / password');
			}

			toggleAuth(false);

			return err;
		});

	return request;
};

// User registration
const fetchSignUpRequest = async (credentials: RegisterCreds) => {
	try {
		const request = await axios({
			method: 'post',
			url: `/auth/sign-up`,
			data: credentials
		});

		toast.success('Done. Check your E-Mail');

		return request;
	} catch (err) {
		toast.error('Something went wrong');
	}
};

// Logout
const fetchSignOutRequest = async () => {
	try {
		const request = await axios({
			method: 'post',
			url: `/auth/sign-out`
		});

		toggleAuth(false);
		clearProfile();
		toast.success('Done. See you soon');

		return request;
	} catch (err) {
		toast.error('Something went wrong');
	}
};

const authHooks = configureAuth({
	userFn: fetchUserRequest,
	loginFn: fetchSignInRequest,
	registerFn: fetchSignUpRequest,
	logoutFn: fetchSignOutRequest
});

export const useUser = authHooks.useUser;
export const useLogin = authHooks.useLogin;
export const useRegister = authHooks.useRegister;
export const useLogout = authHooks.useLogout;
