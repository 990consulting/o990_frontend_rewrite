import { createAction } from 'redux-actions';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SHOW_PRIVACY_BANNER = 'SHOW_PRIVACY_BANNER';
export const CLOSE_PRIVACY_BANNER = 'CLOSE_PRIVACY_BANNER';
export const SITE_IS_VISITED = 'SITE_IS_VISITED';

export const togleSidebar = createAction(TOGGLE_SIDEBAR);
export const showPrivacyBanner = createAction(SHOW_PRIVACY_BANNER);
export const closePrivacyBanner = createAction(CLOSE_PRIVACY_BANNER);
export const siteIsVisited = createAction(SITE_IS_VISITED);
