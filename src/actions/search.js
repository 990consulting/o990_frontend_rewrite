import { createAction } from 'redux-actions';

export const CHANGE_SEARCH_MODE = 'CHANGE_SEARCH_MODE';
export const STORE_SEARCH_VALUE = 'STORE_SEARCH_VALUE';

export const changeSearchMode = createAction(CHANGE_SEARCH_MODE);
export const storeSearchValue = createAction(STORE_SEARCH_VALUE);
