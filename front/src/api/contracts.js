import { request } from '../utils/api';

export const getAll = () => request('/api/contract');

export const get = id => request('/api/contract/' + id);
export const remove = id => request('/api/contract/' + id, { method: 'DELETE' });
export const edit = contract =>
  request('/api/contract/' + contract._id, {
    method: 'PUT',
    body: JSON.stringify({ ...contract, _id: undefined })
  });
export const create = contract =>
  request('/api/contract', {
    method: 'POST',
    body: JSON.stringify(contract)
  });
