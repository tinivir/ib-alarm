import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ALARMS, HOME, CONTRACTS } from '../../constants/route';

const Navigation = props => (
  <Navbar bg="light">
    <Navbar.Brand href={'#' + HOME}>IB Bot</Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href={'#' + HOME}>Home</Nav.Link>
        <Nav.Link href={'#' + CONTRACTS}>Contracts</Nav.Link>
        <Nav.Link href={'#' + ALARMS}>Alarms</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Navigation.propTypes = {};
Navigation.defaultProps = {};

export default Navigation;
