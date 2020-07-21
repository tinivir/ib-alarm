import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import createReducers from './reducers';
import createMiddleware from './middleware';

export default function store({ history }) {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = createMiddleware(history);
  const reducers = createReducers();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(...middleware)));
}
