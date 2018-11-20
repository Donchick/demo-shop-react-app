import {PRODUCTS_RECEIVED,
        PRODUCT_WAS_REMOVED,
        PRODUCT_WAS_UPDATED,
        PRODUCT_WAS_ADDED,
        FILTER_PRODUCTS} from "../constants/products";
import { allCategory } from "../constants/categories";

const products = (state = [], action) => {
    switch (action.type) {
        case PRODUCTS_RECEIVED:
            return action.products;

        case PRODUCT_WAS_REMOVED:
            return state.filter((product) => product.id !== action.removedProductId);

        case PRODUCT_WAS_UPDATED:
            return state.map((product) => product.id === action.product.id ? action.product : product);

        case PRODUCT_WAS_ADDED:
            return state.concat([action.product]);

        case FILTER_PRODUCTS:
            return state.filter((product) =>
                (product.name.toLowerCase().indexOf(action.filter.name.toLowerCase()) >= 0)
                && (product.rating * 1 >= action.filter.rating.from * 1 && product.rating * 1 <= action.filter.rating.to * 1)
                && (product.cost >= action.filter.price.from && product.cost <= action.filter.price.to)
                && (action.filter.gender === 'All' || product.gender === action.filter.gender)
                && (!action.filter.availableOnly || product.count > product.soldCount)
                && (action.filter.category === allCategory || product.categoryId === action.filter.category.id));

        default:
            return state
    }
};

export default products;