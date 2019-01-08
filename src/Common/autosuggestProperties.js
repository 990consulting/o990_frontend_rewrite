/*
 * Copyright (c) 2018 990 Consulting, LLC. All rights reserved.
 */
import apiClient from 'App/ApiClient';

export const orgASProps = {
  route: apiClient.orgSearch,
  slug: "name_org",
  placeholder: "Name of organization...",
  suggestion: apiClient.getListOfOrganizationSuggestion,
  baseUrl: "/search/org/"
};

export const peopleASProps = {
  route: apiClient.peopleSearch,
  slug: "name_person",
  placeholder: "Name of person...",
  suggestion: apiClient.getListOfPeopleSuggestion,
  baseUrl: "/search/people/"
};
