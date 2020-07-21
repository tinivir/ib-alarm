import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Form as FinalForm, Field } from 'react-final-form';
import Required from '../../components/Required';
import { required } from '../../utils/validators';
import Col from 'react-bootstrap/Col';
import operators from '../../constants/operators';
import bars from '../../constants/bars';

const AlarmsModal = ({ onSubmit, show, handleClose, contracts, indicators, alarm }) => {
  const isEdit = Boolean(alarm._id);
  return (
    <Modal show={show} onHide={handleClose}>
      <FinalForm onSubmit={onSubmit}>
        {({ submitting, handleSubmit, values: { indicatorName } }) => {
          const indicator = indicators.find(i => i.name === indicatorName);
          return (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit' : 'Create'} Alarm</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Field validate={required} name="contract" initialValue={alarm.contract?._id}>
                    {({ input, meta }) => (
                      <Form.Group controlId="contract">
                        <Form.Label>
                          Contract <Required />
                        </Form.Label>
                        <Form.Control as="select" isInvalid={meta.touched && meta.invalid} {...input}>
                          <option value="" disabled>
                            Select Contract...
                          </option>
                          {contracts.map(contract => (
                            <option key={contract._id} value={contract._id}>
                              {contract.symbol} ({contract.exchange})
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Field>

                  <Field validate={required} name="bar" initialValue={alarm.bar}>
                    {({ input, meta }) => (
                      <Form.Group controlId="bar">
                        <Form.Label>
                          Bar size <Required />
                        </Form.Label>
                        <Form.Control as="select" isInvalid={meta.touched && meta.invalid} {...input}>
                          <option value="" disabled>
                            Select Bar Size...
                          </option>
                          {bars.map(bar => (
                            <option key={bar}>{bar}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Field>

                  <Field validate={required} name="indicatorName" initialValue={alarm.indicatorName}>
                    {({ input, meta }) => (
                      <Form.Group controlId="indicatorName">
                        <Form.Label>
                          Indicator <Required />
                        </Form.Label>
                        <Form.Control as="select" isInvalid={meta.touched && meta.invalid} {...input}>
                          <option value="" disabled>
                            Select Indicator...
                          </option>
                          {indicators.map(indicator => (
                            <option key={indicator._id} value={indicator.name}>
                              {indicator.name}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Field>

                  {indicator && (
                    <Form.Row>
                      {Object.entries(indicator.arguments).map(([key, arg]) => (
                        <Field
                          key={key}
                          validate={required}
                          name={'indicatorArguments.' + key}
                          initialValue={arg.default}
                        >
                          {({ input, meta }) => (
                            <Form.Group as={Col} md="3" controlId={'indicatorArguments.' + key}>
                              <Form.Label>{arg.name}</Form.Label>
                              <Form.Control {...input} isInvalid={meta.touched && meta.invalid} />
                              <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                            </Form.Group>
                          )}
                        </Field>
                      ))}
                    </Form.Row>
                  )}

                  <Field validate={required} name="operator" initialValue={alarm.operator}>
                    {({ input, meta }) => (
                      <Form.Group controlId="operator">
                        <Form.Label>
                          Operator <Required />
                        </Form.Label>
                        <Form.Control as="select" isInvalid={meta.touched && meta.invalid} {...input}>
                          <option value="" disabled>
                            Select Operator...
                          </option>
                          {operators.map(operator => (
                            <option key={operator}>{operator}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Field>

                  <Field validate={required} type="number" name="value" initialValue={alarm.value || 0}>
                    {({ input, meta }) => (
                      <Form.Group controlId="value">
                        <Form.Label>Value</Form.Label>
                        <Form.Control {...input} isInvalid={meta.touched && meta.invalid} />
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Field>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
                  Submit
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </FinalForm>
    </Modal>
  );
};

AlarmsModal.propTypes = {
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  alarm: PropTypes.object
};
AlarmsModal.defaultProps = {
  onSubmit: () => {},
  show: false,
  handleClose: () => {},
  alarm: {}
};

export default AlarmsModal;
