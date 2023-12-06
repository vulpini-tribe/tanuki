import type { Middleware } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';

import loggerMiddleware from './logger';

const getMiddlewares = (): Array<Middleware> => {
	const commonMiddlewares = [thunkMiddleware];
	const devMiddlewares = import.meta.env.VITE_NODE_ENV === 'development' ? [loggerMiddleware] : [];

	return [...commonMiddlewares, ...devMiddlewares];
};

export default getMiddlewares;
