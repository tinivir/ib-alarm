import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectWS } from 'store/app/thunks';

import Container from 'react-bootstrap/Container';
import Navigation from '../components/Navigation';
import * as ROUTE from 'constants/route';
import AlarmsPage from './Alarms';
import ContractsPage from './Contracts';
import HomePage from './Home';

const mapStateToProps = null;

const mapDispatchToProps = {
  connectWS
};

const Router = ({ connectWS }) => {
  useEffect(() => {
    connectWS();
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <Switch>
          <Route path={ROUTE.HOME} exact component={HomePage} />
          <Route path={ROUTE.ALARMS} component={AlarmsPage} />
          <Route path={ROUTE.CONTRACTS} component={ContractsPage} />
        </Switch>
      </Container>
    </>
  );
};

Router.propTypes = {
  connectWS: PropTypes.func
};

Router.defaultProps = {
  connectWS: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
