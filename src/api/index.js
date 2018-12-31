/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://test.preview.open990/',
  headers: {
    contentType: 'application/json'
  }
});

export default apiClient;
