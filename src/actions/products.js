import productsService from '../services/products';
import { PRODUCTS_RECEIVED,
         PRODUCTS_RECEIVING_ERROR,
         PRODUCT_WAS_REMOVED,
         PRODUCT_REMOVE_PROCESS_FAILED,
         PRODUCT_WAS_ADDED,
         PRODUCT_WAS_UPDATED } from "../constants/products";

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

const productWasAdded = (product) => ({
    type: PRODUCT_WAS_ADDED,
    product
});

const productWasUpdated = (product) => ({
  type: PRODUCT_WAS_UPDATED,
  product
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

export const updateProduct = (product) => dispatch => {
    return productsService.updateProduct(product)
        .then((product) => productWasUpdated(product))
        .then(dispatch);
};

export const addProduct = (product) => dispatch => {
  return productsService.addProduct(product)
      .then((product) => productWasAdded(product))
      .then(dispatch);
};