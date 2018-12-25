import { combineReducers } from 'redux';
import helpers from './helpers';
import organization from './organization';
import search from './search';

const rootReducer = combineReducers({
    helpers,
    organization,
    search
});

export default rootReducer;
