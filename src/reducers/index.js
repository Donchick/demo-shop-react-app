import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import categories from './categories';
import filter from './filter';
import error from './error';

const demoShopStoreApp = combineReducers({
    auth,
    products,
    categories,
    filter,
    error
});

export default demoShopStoreApp;