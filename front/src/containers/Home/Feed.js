import React from 'react';
import PropTypes from 'prop-types';
import { getSecTypeLabel } from '../../constants/secTypes';
import Table from 'react-bootstrap/Table';

const Feed = ({ feed }) => {
  if (!feed || !feed.length) {
    return null;
  }
  return (
    <>
      <h4 className="mt-4">Feed</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Bar size</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {feed.map(({ bar, contract, data }, i) => (
            <tr key={contract._id + bar}>
              <td>{i + 1}</td>
              <td>
                {contract.symbol} ({getSecTypeLabel(contract.secType)})
              </td>
              <td>{bar}</td>
              <td>
                {Object.entries(data).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}</strong>: {key === 'date' ? new Date(value).toLocaleString() : value}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

Feed.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.object,
      bar: PropTypes.string,
      data: PropTypes.object
    })
  )
};
Feed.defaultProps = {
  feed: []
};

export default Feed;
