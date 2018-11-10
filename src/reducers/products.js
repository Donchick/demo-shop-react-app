import { PRODUCTS_RECEIVED, PRODUCT_WAS_REMOVED } from "../constants/products";

const products = (state = [], action) => {
    switch (action.type) {
        case PRODUCTS_RECEIVED:
            return action.products;

        case PRODUCT_WAS_REMOVED:
            return state.filter((product) => product.id !== action.removedProductId);

        default:
            return state
    }
};

export default products;