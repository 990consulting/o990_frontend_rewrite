import {
  TOGGLE_SIDEBAR,
  SHOW_PRIVACY_BANNER,
  CLOSE_PRIVACY_BANNER,
  SITE_IS_VISITED
} from 'actions/helpers';

const initialState = {
  isSidebarOpen: true,
  isSiteAlreadyVisited: false,
  isPrivacyBanerShown: true
};

const helpers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.payload
      };
    case SHOW_PRIVACY_BANNER:
      return {
        ...state,
        isPrivacyBanerShown: true
      };
    case CLOSE_PRIVACY_BANNER:
      return {
        ...state,
        isPrivacyBanerShown: false
      };
    case SITE_IS_VISITED:
      return {
        ...state,
        isSiteAlreadyVisited: true
      };
    default:
      return state
  }
};

export default helpers;
