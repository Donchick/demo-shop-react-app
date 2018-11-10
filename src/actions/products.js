import productsService from '../services/products';
import { PRODUCTS_RECEIVED, PRODUCTS_RECEIVING_ERROR, PRODUCT_WAS_REMOVED, PRODUCT_REMOVE_PROCESS_FAILED } from "../constants/products";

const productsReceived = (products) => ({
    type: PRODUCTS_RECEIVED,
    products
});

const productsReceivingError = (error) => ({
    type: PRODUCTS_RECEIVING_ERROR,
    error
});

const productWasRemoved = (removedProductId) => ({
    type: PRODUCT_WAS_REMOVED,
    removedProductId
});

const productRemoveProcessFailed = (removedProductId) => ({
    type: PRODUCT_REMOVE_PROCESS_FAILED,
    removedProductId
});

export const getProducts = () => dispatch => {
    return productsService.getProducts()
        .then(productsReceived)
        .catch(productsReceivingError)
        .then(dispatch);
};

export const removeProduct = (productId) => dispatch => {
    return productsService.removeProduct(productId)
        .then(() => productWasRemoved(productId))
        .catch(productRemoveProcessFailed)
        .then(dispatch);
};