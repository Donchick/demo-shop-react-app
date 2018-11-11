import {PRODUCTS_RECEIVED, PRODUCT_WAS_REMOVED, FILTER_PRODUCTS} from "../constants/products";

const products = (state = [], action) => {
    switch (action.type) {
        case PRODUCTS_RECEIVED:
            return action.products;

        case PRODUCT_WAS_REMOVED:
            return state.filter((product) => product.id !== action.removedProductId);

        case FILTER_PRODUCTS:
            return state.filter((product) => product.name.toLowerCase().indexOf(action.filter.name.toLowerCase()) >= 0);

        default:
            return state
    }
};

export default products;