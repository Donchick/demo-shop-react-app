import {PRODUCTS_RECEIVED, PRODUCT_WAS_REMOVED, FILTER_PRODUCTS} from "../constants/products";
let productsList = [];

const products = (state = [], action) => {
    switch (action.type) {
        case PRODUCTS_RECEIVED:
            productsList = action.products;
            return productsList;

        case PRODUCT_WAS_REMOVED:
            productsList = state.filter((product) => product.id !== action.removedProductId);
            return productsList;

        case FILTER_PRODUCTS:
            return productsList.filter((product) => product.name.toLowerCase().indexOf(action.keyword.toLowerCase()) >= 0);

        default:
            return state
    }
};

export default products;