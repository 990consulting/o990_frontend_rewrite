/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */

import apiClient from '.';

export const getListOfOrganizationSuggestion = (query) => {
  return apiClient.get(`/api/search/org/suggest/${query}/`);
}

export const getListOfPeopleSuggestion = (query) => {
  return apiClient.get(`/api/search/people/suggest/${query}/`);
}

export const searchOrganizationByQuery = (query) => {
  return apiClient.get(`/api/search/org/simple/${query}/`);
}

export const searchPeopleByQuery = (query) => {
  return apiClient.get(`/api/search/people/simple/${query}/`);
}

export const searchOrganizationsWithParams = (paramsQuery) => {
  return apiClient.get(`/api/search/org/${paramsQuery}/`);
}

export const searchPeopleWithParams = (paramsQuery) => {
  return apiClient.get(`/api/search/people${paramsQuery}/`);
}

export const searchDataByQuery = (searchQuery) => {
  return apiClient.get(`/api/search/data${searchQuery}`)
}

export const downloadIRSFile = (url) => {
  return apiClient.get(`/zip${url}/`)
}
