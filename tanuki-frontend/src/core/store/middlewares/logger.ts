import { createLogger } from 'redux-logger';

const logger = createLogger({
	collapsed: true,
	duration: false,
	timestamp: true,
	level: 'log',
	logErrors: true,
	diff: false
});

export default logger;
