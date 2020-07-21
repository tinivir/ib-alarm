import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Form as FinalForm, Field } from 'react-final-form';
import Required from '../../components/Required';
import { required } from '../../utils/validators';
import { secTypes } from '../../constants/secTypes';
import Badge from 'react-bootstrap/Badge';

const ContractsModal = ({ onSubmit, show, handleClose, contract }) => {
  const isEdit = Boolean(contract._id);
  return (
    <Modal show={show} onHide={handleClose}>
      <FinalForm onSubmit={onSubmit}>
        {({ submitting, handleSubmit }) => (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {isEdit ? 'Edit' : 'Create'} Contract{' '}
                <a
                  className="text-white"
                  href="https://interactivebrokers.github.io/tws-api/basic_contracts.html"
                  target="_blank"
                >
                  <Badge variant="secondary">?</Badge>
                </a>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Field validate={required} name="symbol" initialValue={contract.symbol}>
                  {({ input, meta }) => (
                    <Form.Group controlId="symbol">
                      <Form.Label>
                        Symbol <Required />
                      </Form.Label>
                      <Form.Control isInvalid={meta.touched && meta.invalid} {...input} />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                <Field validate={required} name="secType" initialValue={contract.secType}>
                  {({ input, meta }) => (
                    <Form.Group controlId="secType">
                      <Form.Label>
                        Security Type <Required />
                      </Form.Label>
                      <Form.Control as="select" isInvalid={meta.touched && meta.invalid} {...input}>
                        <option value="" disabled>
                          Select Security Type...
                        </option>
                        {secTypes.map(secType => (
                          <option key={secType.value} value={secType.value}>
                            {secType.label}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                <Field validate={required} name="exchange" initialValue={contract.exchange}>
                  {({ input, meta }) => (
                    <Form.Group controlId="exchange">
                      <Form.Label>
                        Exchange
                        <Required />
                      </Form.Label>
                      <Form.Control isInvalid={meta.touched && meta.invalid} {...input} />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                <Field name="primaryExchange" initialValue={contract.primaryExchange}>
                  {({ input, meta }) => (
                    <Form.Group controlId="primaryExchange">
                      <Form.Label>Primary Exchange</Form.Label>
                      <Form.Control {...input} />
                    </Form.Group>
                  )}
                </Field>
                <Field validate={required} name="currency" initialValue={contract.currency}>
                  {({ input, meta }) => (
                    <Form.Group controlId="currency">
                      <Form.Label>
                        Currency
                        <Required />
                      </Form.Label>
                      <Form.Control isInvalid={meta.touched && meta.invalid} {...input} />
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
        )}
      </FinalForm>
    </Modal>
  );
};

ContractsModal.propTypes = {
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  contract: PropTypes.object
};
ContractsModal.defaultProps = {
  onSubmit: () => {},
  show: false,
  handleClose: () => {},
  contract: {}
};

export default ContractsModal;
