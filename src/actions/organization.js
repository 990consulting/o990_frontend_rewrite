import { createAction } from 'redux-actions';

export const SAVE_ORGANIZATION_DATA = 'SAVE_ORGANIZATION_DATA';
export const SAVE_TABLE = 'SAVE_TABLE';

export const saveTable = createAction(SAVE_TABLE);
export const saveOrganizationData = createAction(SAVE_ORGANIZATION_DATA);
