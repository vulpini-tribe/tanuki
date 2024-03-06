const AUTH = '/auth';
const INDEX = '/main';
const DISHES = '/dishes';
const FOOD = '/food';
const SETTINGS = '/settings';

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
	INDEX: {
		ROOT: INDEX
	},
	DISHES: {
		ROOT: DISHES
	},
	FOOD: {
		ROOT: FOOD
	},
	SETTINGS: {
		ROOT: SETTINGS
	},
	FORBIDDEN: '/403',
	NOT_FOUND: '/404',
	CALLBACK: '/callback',
	CREDITS: '/credits',

	CONTENT: {
		ROOT: '/content',
		FEED: '/content/feed',
		DISHES: '/content/dishes',
		FOOD: '/content/food'
	}
};

export const createRoute = (route: string, params: object, search?: string) => {
	const formattedRoute = Object.entries(params).reduce((acc, [key, value]) => {
		return acc.replace(`:${key}`, value);
	}, route);

	return `${formattedRoute}${search ? search : ''}`;
};

export default ROUTES;
