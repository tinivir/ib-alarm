import React from 'react';
import { Provider } from 'react-redux';
import { Router, withRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import { NotificationContainer } from 'react-notifications';

import createStore from 'store';
import AppRouter from './AppRouter';
import 'react-notifications/lib/notifications.css';

const history = createHashHistory();

const store = createStore({ history });

const WithRouterApp = withRouter(AppRouter);

const App = () => (
  <Provider store={store}>
    <NotificationContainer />
    <Router history={history}>
      <WithRouterApp />
    </Router>
  </Provider>
);

export default App;
