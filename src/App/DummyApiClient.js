/*
 * Copyright (c) 2019 990 Consulting, LLC. All rights reserved.
 */
import {
  skeleton,
  tables,
  orgSearchResults,
  orgSearchSuggestions,
  meta
} from 'App/DummyResponses';

class DummyApiClient {
  getOrgSkeleton(ein) {
    return new Promise(function(resolve, reject) {
      resolve(skeleton);
    })
  }
  
  getTableData(tableId) {
    return new Promise(function(resolve, reject) {
      resolve({ "data": tables[tableId]});
    })
  }
  
  searchOrganizationsWithParams(paramsQuery) {
    return new Promise(function(resolve, reject) {
      resolve(orgSearchResults);
    })
  }
  
  getListOfOrganizationSuggestion(query) {
    return new Promise(function(resolve, reject) {
      resolve(orgSearchSuggestions);
    })
  }
  
  getPageMeta(query) {
    return new Promise(function(resolve, reject) {
      resolve(meta);
    })
  }
  
  searchOrganizationByQuery(query) {
    return new Promise(function(resolve, reject) {
      resolve("/search/org?name_org=foo");
    })
  }
}

export default DummyApiClient;