import { PRODUCT_RECEIVED,
        PRODUCT_WAS_UPDATED } from "../constants/products";

const product = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_RECEIVED:
            return action.product;

        case PRODUCT_WAS_UPDATED:
            return action.product;

        default:
            return state
    }
};

export default product;