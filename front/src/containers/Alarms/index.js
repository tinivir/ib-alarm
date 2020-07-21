import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { alarmsSelector, contractsSelector, indicatorsSelector } from '../../store/app';
import { fetchAlarms, createAlarm, editAlarm, removeAlarm } from './thunks';
import Button from 'react-bootstrap/Button';
import AlarmsModal from './Modal';
import Form from 'react-bootstrap/Form';

const mapStateToProps = state => ({
  alarms: alarmsSelector(state),
  contracts: contractsSelector(state),
  indicators: indicatorsSelector(state)
});
const mapDispatchToProps = {
  fetchAlarms,
  createAlarm,
  removeAlarm,
  editAlarm
};

const defaultAlarm = { contract: {} };

const AlarmsPage = ({ alarms, contracts, indicators, fetchAlarms, createAlarm, editAlarm, removeAlarm }) => {
  const [showModal, setShowModal] = useState(false);
  const [alarm, setAlarm] = useState({});

  const openModal = (alarm = {}) => {
    setAlarm(alarm);
    setShowModal(true);
  };
  const onSubmit = async data => {
    const updatedAlarm = { ...alarm, ...data };

    if (updatedAlarm.indicatorArguments) {
      Object.entries(updatedAlarm.indicatorArguments).forEach(([k, v]) => (updatedAlarm.indicatorArguments[k] = +v));
    }

    const isSuccess = await (alarm._id ? editAlarm : createAlarm)(updatedAlarm);
    if (isSuccess) {
      setShowModal(false);
    }
  };

  const toggleEnabled = alarm => {
    editAlarm({ _id: alarm._id, enabled: !alarm.enabled });
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  return (
    <>
      <h3>Alarms</h3>
      <div className="mb-2">
        <Button onClick={() => openModal(defaultAlarm)}>Create New</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Contract</th>
            <th>Formula</th>
            <th>Bar size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm, i) => (
            <tr key={alarm._id}>
              <td>
                <Form.Check
                  type="switch"
                  id={'toggle-' + alarm._id}
                  label=""
                  checked={alarm.enabled}
                  onChange={() => toggleEnabled(alarm)}
                />
              </td>
              <td>
                {alarm.contract?.symbol} ({alarm.contract?.exchange})
              </td>
              <td>
                <strong>{alarm.indicatorName}</strong> [
                {Object.entries(alarm.indicatorArguments || {})
                  .map(([key, value]) => `${key}:${value}`)
                  .join(', ')}
                ] {alarm.operator} <strong>{alarm.value}</strong>
              </td>
              <td>{alarm.bar}</td>
              <td>
                <Button variant="danger" className="mr-2" onClick={() => removeAlarm(alarm)}>
                  Remove
                </Button>
                <Button variant="warning" onClick={() => openModal(alarm)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AlarmsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSubmit={onSubmit}
        alarm={alarm}
        contracts={contracts}
        indicators={indicators}
      />
    </>
  );
};

AlarmsPage.propTypes = {
  alarms: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.object,
      indicatorName: PropTypes.string,
      indicatorArguments: PropTypes.object,
      operator: PropTypes.string,
      value: PropTypes.number,
      bar: PropTypes.string,
      enabled: PropTypes.bool
    })
  ),
  contracts: PropTypes.array,
  indicators: PropTypes.array,
  fetchAlarms: PropTypes.func,
  createAlarm: PropTypes.func,
  removeAlarm: PropTypes.func,
  editAlarm: PropTypes.func
};
AlarmsPage.defaultProps = {
  alarms: [],
  contracts: [],
  indicators: [],
  fetchAlarms: () => {},
  createAlarm: () => {},
  removeAlarm: () => {},
  editAlarm: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsPage);
