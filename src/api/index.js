import axios from 'axios';

//Uncomment for local development. Please do not commit uncommented to VCS.
// const baseURL = 'http://proto.intranet.open990:8080/';

const apiClient = axios.create({
  headers: {
    contentType: 'application/json'
  }
});

export default apiClient;
