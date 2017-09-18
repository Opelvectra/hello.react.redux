import StorageFactory from '../../utils/StorageFactory';

export default {
  addToCart: function(itemId){
    let cartItems = (StorageFactory.getObject('cartItems') || {}).cartItems || [];
    cartItems.push(itemId);
    StorageFactory.saveObject('cartItems', {cartItems: cartItems});
  },
  removeFromCart: function(itemId){
    let cartItems = (StorageFactory.getObject('cartItems') || {}).cartItems || [];
    let result = cartItems.filter(el => el !== itemId.toString());
    StorageFactory.saveObject('cartItems', {cartItems: result});
  },
  getCartItems: function(){
    return (StorageFactory.getObject('cartItems') || {}).cartItems || [];
  }
};
