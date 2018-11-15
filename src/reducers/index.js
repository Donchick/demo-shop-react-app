import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import categories from './categories';

const demoShopStoreApp = combineReducers({
    auth,
    products,
    categories
});

export default demoShopStoreApp;