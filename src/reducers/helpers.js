import {
  SHOW_PRIVACY_BANNER,
  CLOSE_PRIVACY_BANNER,
  SITE_IS_VISITED
} from 'actions/helpers';

const initialState = {
  isSidebarOpen: true,
  isSiteAlreadyVisited: false,
  isPrivacyBannerShown: true
};

const helpers = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PRIVACY_BANNER:
      return {
        ...state,
        isPrivacyBannerShown: true
      };
    case CLOSE_PRIVACY_BANNER:
      return {
        ...state,
        isPrivacyBannerShown: false
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
