import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

const DEVELOPMENT_MODE = 'development';

const createMiddleware = history => {
  const middleware = [
    thunk.withExtraArgument(history),
    // thunk,
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV === DEVELOPMENT_MODE) {
    middleware.push(require('redux-logger').createLogger({ collapsed: true }));
  }

  return middleware;
};

export default createMiddleware;
