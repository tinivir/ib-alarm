import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { contractsSelector } from '../../store/app';
import { fetchContracts, createContract, editContract, removeContract } from './thunks';
import Button from 'react-bootstrap/Button';
import ContractsModal from './Modal';
import { getSecTypeLabel } from '../../constants/secTypes';

const mapStateToProps = state => ({
  contracts: contractsSelector(state)
});
const mapDispatchToProps = {
  fetchContracts,
  createContract,
  removeContract,
  editContract
};

const defaultContract = { exchange: 'SMART', currency: 'USD' };

const ContractsPage = ({ contracts, fetchContracts, createContract, editContract, removeContract }) => {
  const [showModal, setShowModal] = useState(false);
  const [contract, setContract] = useState({});

  const openModal = (contract = {}) => {
    setContract(contract);
    setShowModal(true);
  };
  const onSubmit = async data => {
    const isSuccess = await (contract._id ? editContract : createContract)({ ...contract, ...data });
    if (isSuccess) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <>
      <h3>Contracts</h3>
      <div className="mb-2">
        <Button onClick={() => openModal(defaultContract)}>Create New</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Security Type</th>
            <th>Exchange</th>
            <th>Primary Exchange</th>
            <th>Currency</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, i) => (
            <tr key={contract._id}>
              <td>{i + 1}</td>
              <td>{contract.symbol}</td>
              <td>{getSecTypeLabel(contract.secType)}</td>
              <td>{contract.exchange}</td>
              <td>{contract.primaryExchange}</td>
              <td>{contract.currency}</td>
              <td>
                <Button variant="danger" className="mr-2" onClick={() => removeContract(contract)}>
                  Remove
                </Button>
                <Button variant="warning" onClick={() => openModal(contract)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ContractsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSubmit={onSubmit}
        contract={contract}
      />
    </>
  );
};

ContractsPage.propTypes = {
  contracts: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      secType: PropTypes.string,
      exchange: PropTypes.string,
      lastTradeDateOrContractMonth: PropTypes.string,
      currency: PropTypes.string
    })
  ),
  fetchContracts: PropTypes.func
};
ContractsPage.defaultProps = {
  contracts: [],
  fetchContracts: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsPage);
