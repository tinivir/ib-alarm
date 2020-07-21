import { request } from '../utils/api';

export const getAll = () => request('/api/alarm');

export const get = id => request('/api/alarm/' + id);
export const remove = id => request('/api/alarm/' + id, { method: 'DELETE' });
export const edit = alarm =>
  request('/api/alarm/' + alarm._id, {
    method: 'PUT',
    body: JSON.stringify({ ...alarm, _id: undefined })
  });
export const create = alarm =>
  request('/api/alarm', {
    method: 'POST',
    body: JSON.stringify(alarm)
  });
