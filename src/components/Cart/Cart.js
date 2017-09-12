import React from 'react';
import timelineApi from '../../apiHelpers/timeline';
import {Button} from 'react-bootstrap';
import './cart.scss';
import StorageFactory from '../../utils/StorageFactory';

class Cart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topics: []
    };
    this.updateCartList = this.updateCartList.bind(this);
    this.buy = this.buy.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  updateCartList() {
    timelineApi.timeline()
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data, this.state);
        let cartItems = StorageFactory.getObject('cartItems');
        this.setState({
          topics: [...res.data.topics].map(function(topic){
            let isInCart = cartItems && cartItems[topic.id];
            return Object.assign({}, topic, {isInCart: !!isInCart});
          })
        });
      });
  }

  removeFromCart(e){
    updateIsInCartState(e, false, this);
  }

  buy(){
    alert('not implemented');
  }

  componentDidMount() {
    this.updateCartList();
  }

  render() {
    let that = this;
    let topics = this.state.topics.filter(item => item.isInCart).map((topic, index) =>
      <div key={index} className={'cart-item'}>
        <div className={'cart-item-title'}>{topic.title || 'Title'}</div>
        <div className={'cart-image'}>
          <img src={'http://localhost:8002/' + topic.imageUrl} />
          <button className={'timeline-item-is-in-cart'} onClick={that.removeFromCart} value={topic.id}>remove from cart</button>
          <div className={'cart-item-price'}>${topic.price}</div>
        </div>
        <div className={'timeline-item-description'}>{topic.description}</div>
        <div></div>
      </div>
    );
    let totalPrice = this.state.topics
      .filter(item => item.isInCart)
      .reduce((sum, el) => sum + el.price, 0);

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

function updateIsInCartState(e, newState, context){
  if(e.target && e.target.value !== undefined){
    let cartItems = StorageFactory.getObject('cartItems');
    cartItems[e.target.value] = newState;
    StorageFactory.saveObject('cartItems', cartItems);
    context.setState({
      topics: [...context.state.topics].map(function(topic){
        return Object.assign({}, topic, {
          isInCart: e.target.value === topic.id.toString() ? newState : topic.isInCart
        });
      })
    });
  }
}

export default Cart;
