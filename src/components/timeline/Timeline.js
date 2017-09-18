import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './timeline.scss';
import * as cartItemsIdsActions from '../../actions/cartItemsIdsActions';
import cartService from '../cart/cartService';

class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.addToCart = this.addToCart.bind(this);
    this.removeToCart = this.removeToCart.bind(this);
  }

  addToCart(e) {
    this.props.cartItemsIdsActions.addCartItemsId(e.target.value.toString());
    cartService.addToCart(e.target.value.toString());
  }

  removeToCart(e){
    this.props.cartItemsIdsActions.removeCartItemsId(e.target.value.toString());
    cartService.removeFromCart(e.target.value.toString());
  }

  render() {
    let productItems = this.props.products.map((topic, index) =>
      <div key={index} className={'timeline-item'}>
        <div className={'timeline-item-title'}>{topic.title || 'Title'}</div>
        <div className={'timeline-image'}>
          <img src={'http://localhost:8002/' + topic.imageUrl} />
          {getActionButton(topic, this.props.cartItemsIds, this)}
          <div className={'dog-item-price'}>${topic.price}</div>
        </div>
        <div className={'timeline-item-description'}>{topic.description}</div>
        <div></div>
      </div>
    );

    return (
      <div>
        <div>
          {productItems}
        </div>
      </div>
    );

    function getActionButton(dogItem, cartItemsIds, context){
      if(cartItemsIds.indexOf(dogItem.id.toString()) !== -1){
        return (
          <button className={'timeline-item-is-in-cart'} onClick={context.removeToCart} value={dogItem.id}>remove from cart</button>
        );
      } else {
        return (
          <button className={'timeline-item-add-to-cart'} onClick={context.addToCart} value={dogItem.id}>add to cart</button>
        );
      }
    }
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
)(Timeline);
