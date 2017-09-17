import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import './cart.scss';
import * as cartItemsIdsActions from '../../actions/cartItemsIdsActions';
import cartService from './cartService';
import * as config from '../../config';

class Cart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.buy = this.buy.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart(e){
    if(e.target && e.target.value !== undefined){
      this.props.cartItemsIdsActions.removeCartItemsId(e.target.value.toString());
      cartService.removeFromCart(e.target.value.toString());
    }
  }

  buy(){
    alert('not implemented');
  }

  render() {
    let productsInCart = this.props.products.filter(item => this.props.cartItemsIds.indexOf(item.id.toString()) !== -1);
    let totalPrice = productsInCart.reduce((sum, el) => sum + el.price, 0);
    let topics = productsInCart.map((topic, index) =>
      <div key={index} className={'cart-item'}>
        <div className={'cart-item-title'}>{topic.title || 'Title'}</div>
        <div className={'cart-image'}>
          <img src={config.apiUrl + topic.imageUrl} />
          <button className={'timeline-item-is-in-cart'} onClick={this.removeFromCart} value={topic.id}>remove from cart</button>
          <div className={'cart-item-price'}>${topic.price}</div>
        </div>
        <div className={'timeline-item-description'}>{topic.description}</div>
        <div></div>
      </div>
    );

    return (
      <div>
        <div>
          {topics.length ? topics : (
            <div className={'cart-empty-container'}>Your cart is empty</div>
          )}
        </div>
        <div className={'cart-total-panel'}>
          <div className={'cart-total-container'}>total: ${totalPrice}</div>
          <Button bsStyle="primary" className={'buy-bttn'} onClick={this.buy}>buy</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cartItemsIds: state.cartItemsIds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cartItemsIdsActions: bindActionCreators(cartItemsIdsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
