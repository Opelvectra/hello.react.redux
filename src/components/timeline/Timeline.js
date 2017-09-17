import React from 'react';
import timelineApi from '../../apiHelpers/timeline';
import './timeline.scss';
import StorageFactory from '../../utils/StorageFactory';
import {bindActionCreators} from 'redux';
import * as cartItemsActions from '../../actions/cartItemsActions';
import {connect} from 'react-redux';

class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topics: []
    };
    this.updateTimeline = this.updateTimeline.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeToCart = this.removeToCart.bind(this);
  }

  updateTimeline() {
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
    if(e && e.target){
      cartItemsActions.addCartItem({
        id: e.target.value,
        atata: 'atata!'
      });
    }
  }

  removeToCart(e){
    updateIsInCartState(e, false, this);
  }

  componentDidMount() {
    this.updateTimeline();
  }

  render() {
    let that = this;
    console.log(this.props);
    let topicsSize = this.state.topics.map((topic, index) =>
      <div key={index} className={'timeline-item'}>
        <div className={'timeline-item-title'}>{topic.title || 'Title'}</div>
        <div className={'timeline-image'}>
          <img src={'http://localhost:8002/' + topic.imageUrl} />
          {getActionButton(topic)}
          <div className={'dog-item-price'}>${topic.price}</div>
        </div>
        <div className={'timeline-item-description'}>{topic.description}</div>
        <div></div>
      </div>
    );

    return (
      <div>
        <div>
          {topicsSize}
        </div>
      </div>
    );

    function getActionButton(dogItem){
      if(dogItem.isInCart){
        return (
          <button className={'timeline-item-is-in-cart'} onClick={that.removeToCart} value={dogItem.id}>remove from cart</button>
        );
      } else {
        return (
          <button className={'timeline-item-add-to-cart'} onClick={that.addToCart} value={dogItem.id}>add to cart</button>
        );
      }
    }
  }
}

function updateIsInCartState(e, newState, context){
  if(e.target && e.target.value !== undefined){
    let cartItems = StorageFactory.getObject('cartItems') || {};
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

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartItemsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
