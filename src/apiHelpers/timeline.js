import axios from 'axios';

const timelineApi = {
  timeline: function(){
    return axios.get(`http://localhost:8002/timeline`);
  }
};

export default timelineApi;
