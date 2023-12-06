import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import getMiddlewares from './middlewares';

const configuredStore = configureStore({
	reducer: rootReducer,
	middleware: getMiddlewares,
	devTools: import.meta.env.VITE_NODE_ENV !== 'production',
	preloadedState: {}
});

export const store = configuredStore;
export const persistor = persistStore(configuredStore);
