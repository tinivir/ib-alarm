import { request } from '../utils/api';

export const connect = ({ port, host }) =>
  request('/api/ib/connect', {
    method: 'POST',
    body: JSON.stringify({ port, host })
  });
export const historicalData = () => request('/api/ib/historical-data');

export const check = () => request('/api/ib');

export const setFeed = toggledFeedOn =>
  request('/api/ib/feed', {
    method: 'POST',
    body: JSON.stringify({ toggledFeedOn })
  });
