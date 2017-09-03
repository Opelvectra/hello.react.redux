import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Hello React
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem>
                Home
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/fuel-savings">
              <NavItem>
                Fuel Savings
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>
                Contacts
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            atata!
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
