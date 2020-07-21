import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form as FinalForm, Field } from 'react-final-form';
import { connectToIB, checkIB, toggleFeed } from './thunks';
import { ibSelector, feedSelector } from 'store/app';
import Loader from 'components/Loader';
import { historicalData } from '../../api/ib';
import Feed from './Feed';

const mapStateToProps = state => ({
  ib: ibSelector(state),
  feed: feedSelector(state)
});
const mapDispatchToProps = {
  toggleFeed,
  connectToIB,
  checkIB
};

const HomePage = ({ connectToIB, checkIB, ib, feed, toggleFeed }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkIB().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (ib.connected) {
    return (
      <>
        <h3>
          IB is connected ({ib.host}:{ib.port})
        </h3>
        {/*<Button onClick={historicalData}>Get Data</Button>*/}
        {!ib.toggledFeedOn ? (
          <Button className="btn btn-success" onClick={toggleFeed}>
            On
          </Button>
        ) : (
          <>
            <Button className="btn btn-danger" onClick={toggleFeed}>
              Off
            </Button>
            <div>
              Feed is working{' '}
              <div className="spinner-border" role="status" style={{ width: '1em', height: '1em' }}>
                <span className="sr-only">Loading...</span>
              </div>
              {feed.length > 0 && <div>Last update: {new Date().toLocaleString()}</div>}
            </div>
            <Feed feed={feed} />
          </>
        )}
      </>
    );
  }

  const onSubmit = async data => {
    await connectToIB(data);
  };

  return (
    <FinalForm onSubmit={onSubmit}>
      {({ submitting, handleSubmit }) => (
        <Form>
          <h3>IB is not connected</h3>

          <Field name="host" initialValue={ib.host || '127.0.0.1'}>
            {({ input, meta }) => (
              <Form.Group controlId="host">
                <Form.Label>Interactive Brokers HOST</Form.Label>
                <Form.Control {...input} />
              </Form.Group>
            )}
          </Field>
          <Field name="port" initialValue={ib.port || 4002}>
            {({ input, meta }) => (
              <Form.Group controlId="port">
                <Form.Label>Interactive Brokers PORT</Form.Label>
                <Form.Control {...input} />
              </Form.Group>
            )}
          </Field>

          <Button variant="primary" disabled={submitting} type="submit" onClick={handleSubmit}>
            Connect to IB
          </Button>
        </Form>
      )}
    </FinalForm>
  );
};

HomePage.propTypes = {
  ib: PropTypes.shape({
    connected: PropTypes.bool,
    host: PropTypes.string,
    port: PropTypes.number
  }),
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.object,
      bar: PropTypes.string,
      data: PropTypes.object
    })
  ),
  checkIB: PropTypes.func,
  toggleFeed: PropTypes.func,
  connectToIB: PropTypes.func
};
HomePage.defaultProps = {
  ib: {
    connected: false
  },
  feed: [],
  checkIB: () => {},
  toggleFeed: () => {},
  connectToIB: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
