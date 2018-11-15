import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import categories from './categories';
import filter from './filter';

const demoShopStoreApp = combineReducers({
    auth,
    products,
    categories,
    filter
});

export default demoShopStoreApp;