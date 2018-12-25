import {
  SAVE_ORGANIZATION_DATA,
  SAVE_TABLE
} from 'actions/organization';

const initialState = {
  toc: [],
  data: [],
  table: []
};

const organization = (state = initialState, action) => {
  switch (action.type) {
      case SAVE_ORGANIZATION_DATA:
      return {
        ...state,
        data: action.payload,
        table: []
      }
      case SAVE_TABLE: {
        return {
          ...state,
          table: [...state.table, action.payload]
        }
      }
    default:
      return state
  }
};

export default organization;
