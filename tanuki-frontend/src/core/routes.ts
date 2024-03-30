import QS from 'qs';
const AUTH = '/auth';
const UTILS = '/utils';
const CONTENT = '/content';
const PROFILE = '/profile';

const ROUTES = {
	ROOT: '/',
	AUTH: {
		ROOT: AUTH,
		RESET_PASSWORD: `${AUTH}/reset-password`,
		NEW_PASSWORD: `${AUTH}/new-password`,
		SIGN_OUT: `${AUTH}/sign_out`,
		SIGN_IN: `${AUTH}/sign_in`,
		SIGN_UP: `${AUTH}/sign_up`,
		VALIDATE: `${AUTH}/validate`
		// SIGN_2FA: `${AUTH}/sign_2fa`
	},
	PROFILE: {
		ROOT: PROFILE,
		EDIT: `${PROFILE}/edit`,
		SETTINGS: `${PROFILE}/settings`
	},
	UTILS: {
		ROOT: UTILS
	},
	FORBIDDEN: '/403',
	NOT_FOUND: '/404',
	CALLBACK: '/callback',
	CREDITS: '/credits',

	CONTENT: {
		ROOT: CONTENT,
		FEED: `${CONTENT}/feed`,
		DISHES: `${CONTENT}/dishes`,
		FOOD: `${CONTENT}/food`
	}
};

export const createRoute = (route: string, params: object, search?: string) => {
	const formattedRoute = Object.entries(params).reduce((acc, [key, value]) => {
		return acc.replace(`:${key}`, value);
	}, route);

	return `${formattedRoute}${search ? search : ''}`;
};

export const createLinkWithQuery = (pathname: string, query: { [key: string]: string }) => {
	const search = QS.stringify(query);

	return `${pathname}?${search}`;
};

export default ROUTES;
