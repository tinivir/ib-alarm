import { getAll, create, edit, remove } from '../../api/alarms';
import { getAll as getAllIndicators } from '../../api/indicators';
import { getAll as getAllContracts } from '../../api/contracts';
import { alarmsSelector, setAlarms, setContracts, setIndicators } from '../../store/app';
import { NotificationManager } from 'react-notifications';

export const fetchAlarms = () => async dispatch => {
  const alarms = await getAll();

  // debugger;
  dispatch(setAlarms(alarms));

  const [indicators, contracts] = await Promise.all([getAllIndicators(), getAllContracts()]);

  dispatch(setIndicators(indicators));
  dispatch(setContracts(contracts));
};

export const removeAlarm = ({ _id }) => async (dispatch, getState) => {
  try {
    await remove(_id);

    const alarms = alarmsSelector(getState());
    dispatch(setAlarms(alarms.filter(c => c._id !== _id)));

    NotificationManager.success('Alarm is removed', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};

export const createAlarm = alarm => async (dispatch, getState) => {
  try {
    const newAlarm = await create(alarm);

    const alarms = alarmsSelector(getState());
    dispatch(setAlarms([...alarms, newAlarm]));

    NotificationManager.success('Alarm is created', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};
export const editAlarm = alarm => async (dispatch, getState) => {
  try {
    const editedAlarm = await edit(alarm);

    const alarms = alarmsSelector(getState());
    dispatch(setAlarms(alarms.map(c => (c._id === alarm._id ? editedAlarm : c))));

    NotificationManager.success('Alarm is updated', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};
