import axios from 'axios';
import * as config from '../config';

const shopApi = {
  getAllProducts: function(){
    return axios.get(config.apiUrl + `products`);
  }
};

export default shopApi;
