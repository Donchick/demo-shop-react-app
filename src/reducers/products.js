import { PRODUCTS_RECEIVED } from "../constants/products";

const products = (state = [], action) => {
    switch (action.type) {
        case PRODUCTS_RECEIVED:
            return action.products;

        default:
            return state
    }
};

export default products;