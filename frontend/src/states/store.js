import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
