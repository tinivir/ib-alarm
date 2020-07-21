import { NotificationManager } from 'react-notifications';
import { connect } from 'api/ws';
import { setFeed } from '.';
import { parseError } from '../../utils/api';
import { checkIB } from '../../containers/Home/thunks';
import { playAudio } from '../../utils/playAudio';

export const connectWS = () => (dispatch, getState) => {
  connect(message => {
    const data = JSON.parse(message.data);

    if (data.error) {
      if (data.error.errorCode === 504 && data.error.errorString === 'Not connected') {
        dispatch(checkIB());
      }

      NotificationManager.error(parseError(data.error), 'Error!');
    }

    if (data.feeds) {
      dispatch(setFeed(data.feeds));
    }

    if (data.alarm) {
      NotificationManager.info(data.alarm.subject, 'Alarm!');
      playAudio(data.alarm.indicatorName);
    }
  });
};
