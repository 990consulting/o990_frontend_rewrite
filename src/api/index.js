import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://prod.preview.open990/',
  headers: {
    contentType: 'application/json'
  }
});

export default apiClient;
