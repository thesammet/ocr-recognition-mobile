import { createStore, combineReducers } from 'redux';
import CountReducer from './reducer/index';

const rootReducer = combineReducers({
    count: CountReducer,
});

export const store = createStore(rootReducer);