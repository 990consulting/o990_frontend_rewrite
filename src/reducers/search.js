import {
  CHANGE_SEARCH_MODE,
  STORE_SEARCH_VALUE
} from 'actions/search';

const initialState = {
  isOrganizationSearchMode: true,
  searchValue: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_MODE: 
      return {
        ...state,
        isOrganizationSearchMode: action.payload === 'organization'
      }
    case STORE_SEARCH_VALUE: 
      return {
        ...state,
        searchValue: action.payload
      }
    default:
      return state
  }
};

export default search;
