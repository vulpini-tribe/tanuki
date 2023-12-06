import { store } from '@core/store';
import rootReducer from '@core/store/rootReducer';

export type Dispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type Store = ReturnType<typeof rootReducer>;
