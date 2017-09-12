import React from 'react';
import timelineApi from '../../apiHelpers/timeline';
import './cart.scss';
import StorageFactory from '../../utils/StorageFactory';

class Cart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topics: []
    };
    this.updateCartList = this.updateCartList.bind(this);
    this.addToCart = this.addToCart.bind(this);
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

  addToCart(e) {
    updateIsInCartState(e, true, this);
  }

  removeFromCart(e){
    updateIsInCartState(e, false, this);
  }

  componentDidMount() {
    this.updateCartList();
  }

  render() {
    let that = this;
    let topics = this.state.topics.filter(item => item.isInCart).map((topic, index) =>
      <div key={index} className={'timeline-item'}>
        <div className={'timeline-item-title'}>{topic.title || 'Title'}</div>
        <div className={'cart-image'}>
          <img src={'http://localhost:8002/' + topic.imageUrl} />
          <button className={'timeline-item-is-in-cart'} onClick={that.removeFromCart} value={topic.id}>remove from cart</button>
        </div>
        <div className={'timeline-item-description'}>{topic.description}</div>
        <div></div>
      </div>
    );

    return (
      <div>
        <div>
          {topics.length ? topics : (
            <div>Your cart is empty</div>
          )}
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
