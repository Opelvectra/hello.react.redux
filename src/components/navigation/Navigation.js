import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import {connect} from 'react-redux';
import cartService from '../cart/cartService';

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let cartItemsIds = cartService.getCartItems();
    let cartItems = this.props.products.filter(function(el){
      return cartItemsIds.some(cartItemId => cartItemId.toString() === el.id.toString());
    });

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
            <LinkContainer to="/cart">
              <NavItem>
                Cart({cartItems.length})
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/fuel-savings">
              <NavItem>
                fuel-savings
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>
                about
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

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems,
    products: state.products,
    cartItemsIds: state.cartItemsIds
  };
}

export default connect(
  mapStateToProps
)(Navigation);
