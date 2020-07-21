import { getAll, create, edit, remove } from '../../api/contracts';
import { contractsSelector, setContracts } from '../../store/app';
import { NotificationManager } from 'react-notifications';

export const fetchContracts = () => async dispatch => {
  const contracts = await getAll();

  dispatch(setContracts(contracts));
};

export const removeContract = ({ _id }) => async (dispatch, getState) => {
  try {
    await remove(_id);

    const contracts = contractsSelector(getState());
    dispatch(setContracts(contracts.filter(c => c._id !== _id)));

    NotificationManager.success('Contract is removed', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};

export const createContract = contract => async (dispatch, getState) => {
  try {
    const newContract = await create(contract);

    const contracts = contractsSelector(getState());
    dispatch(setContracts([...contracts, newContract]));

    NotificationManager.success('Contract is created', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};
export const editContract = contract => async (dispatch, getState) => {
  try {
    const editedContract = await edit(contract);

    const contracts = contractsSelector(getState());
    dispatch(setContracts(contracts.map(c => (c._id === contract._id ? editedContract : c))));

    NotificationManager.success('Contract is updated', 'Success!');
    return true;
  } catch (e) {
    NotificationManager.error('Something going wrong!', 'Error!');
  }
};
