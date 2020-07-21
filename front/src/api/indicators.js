import { request } from '../utils/api';

export const getAll = () => request('/api/indicator');

export const get = id => request('/api/indicator/' + id);
export const remove = id => request('/api/indicator/' + id, { method: 'DELETE' });
export const edit = indicator =>
  request('/api/indicator/' + indicator._id, {
    method: 'PUT',
    body: JSON.stringify({ ...indicator, _id: undefined })
  });
export const create = indicator =>
  request('/api/indicator', {
    method: 'POST',
    body: JSON.stringify(indicator)
  });
