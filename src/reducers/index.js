import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';

const demoShopStoreApp = combineReducers({
    auth,
    products
});

export default demoShopStoreApp;