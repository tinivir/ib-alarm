import { connect, check, setFeed } from '../../api/ib';
import { ibSelector, setIb } from '../../store/app';

import { NotificationManager } from 'react-notifications';

export const connectToIB = ({ port, host }) => async dispatch => {
  try {
    const { connected } = await connect({ port, host });
    if (!connected) {
      NotificationManager.error('Check if TWS or IB Gateway is started', 'IB is not connected');
      return;
    }
    NotificationManager.success('IB is connected!', 'Success!');
    dispatch(setIb({ port, host, connected }));
  } catch (e) {
    NotificationManager.error('Check if TWS or IB Gateway is started', 'IB is not connected');
  }
};

export const checkIB = () => async dispatch => {
  try {
    const ib = await check();
    dispatch(setIb(ib));
  } catch (e) {
    NotificationManager.error('IB is not connected', 'Something went wrong');
  }
};

export const toggleFeed = () => async (dispatch, getState) => {
  const ib = ibSelector(getState());
  try {
    const response = await setFeed(!ib.toggledFeedOn);
    dispatch(setIb({ ...ib, toggledFeedOn: response.toggledFeedOn }));
  } catch (e) {
    NotificationManager.error('Feed in not toggled', 'Something went wrong');
  }
};
