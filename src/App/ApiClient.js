/*
 * Copyright (c) 2019 990 Consulting, LLC. All rights reserved.
 */

import axios from 'axios';
//import DummyApiClient from 'App/DummyApiClient';

class ApiClient {
  
  axiosBinding = axios.create({
    baseURL: 'http://test.preview.open990/',
    headers: {
      contentType: 'application/json'
    }
  });

  getListOfOrganizationSuggestion = (query) => {
    return this.axiosBinding.get(`/api/search/org/suggest/${query}/`);
  };
  
  getListOfPeopleSuggestion = (query) => {
    return this.axiosBinding.get(`/api/search/people/suggest/${query}/`);
  };
  
  searchOrganizationByQuery = (query) => {
    return this.axiosBinding.get(`/api/search/org/simple/${query}/`);
  };
  
  searchPeopleByQuery = (query) => {
    return this.axiosBinding.get(`/api/search/people/simple/${query}/`);
  };
  
  searchOrganizationsWithParams = (paramsQuery) => {
    return this.axiosBinding.get(`/api/search/org/${paramsQuery}`);
  };
  
  searchPeopleWithParams = (paramsQuery) => {
    return this.axiosBinding.get(`/api/search/people/${paramsQuery}`);
  };
  
  searchDataByQuery = (searchQuery) => {
    return this.axiosBinding.get(`/api/search/data${searchQuery}`)
  };
  
  downloadIRSFile = (url) => {
    return this.axiosBinding.get(`/zip${url}/`)
  };
  
  getPageMeta = (url) => {
    const path = url.substring(1);
    return this.axiosBinding.get(`/api/meta/${path && `${path}/`}`);
  };
  
  getOrgSkeleton = (ein) => {
    return this.axiosBinding.get(`/api/org/skeleton/${ein}/`);
  };
  
  getTableData = (tableId) => {
    return this.axiosBinding.get(`/api/org/table/${tableId}/`);
  }
}

const apiClient = new ApiClient();
//const apiClient = new DummyApiClient();
export default apiClient;
