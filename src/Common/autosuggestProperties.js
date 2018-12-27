import { orgSearch, peopleSearch } from 'App/routes';
import { getListOfOrganizationSuggestion, getListOfPeopleSuggestion } from 'api/search';

export const orgASProps = {
  route: orgSearch,
  slug: "name_org",
  placeholder: "Name of organization...",
  suggestion: getListOfOrganizationSuggestion
};

export const peopleASProps = {
  route: peopleSearch,
  slug: "name_person",
  placeholder: "Name of person...",
  suggestion: getListOfPeopleSuggestion
};
