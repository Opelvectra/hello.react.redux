import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
import {bindActionCreators} from 'redux';
import * as productsActions from '../actions/productsActions';
import * as cartItemsIdsActions from '../actions/cartItemsIdsActions';
import shopApi from '../apiHelpers/shop';
import StorageFactory from '../utils/StorageFactory';

class Root extends Component {
  constructor(props, context) {
    super(props, context);
    shopApi.getAllProducts()
      .then(res => {
        this.props.productsActions.initProducts(res.data.topics);
        let cartItemsIds = StorageFactory.getObject('cartItems').cartItems || [];
        this.props.cartItemsIdsActions.initCartItemsIds(cartItemsIds);
      });
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems,
    products: state.products,
    cartItemsIds: state.cartItemsIds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(productsActions, dispatch),
    cartItemsIdsActions: bindActionCreators(cartItemsIdsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
