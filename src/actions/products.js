import productsService from '../services/products';
import { PRODUCTS_RECEIVED,
         PRODUCT_WAS_ADDED,
         PRODUCT_WAS_UPDATED,
         PRODUCT_WAS_REMOVED,
         PRODUCT_RECEIVED} from "../constants/products";
import { PROCESS_WAS_FAILED } from '../constants/error';

const productsReceived = (products) => ({
    type: PRODUCTS_RECEIVED,
    products
});

const productReceived = (product) => ({
  type: PRODUCT_RECEIVED,
  product
});

const productWasRemoved = (removedProductId) => ({
  type: PRODUCT_WAS_REMOVED,
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

const processFailed = (message) => ({
  type: PROCESS_WAS_FAILED,
  message
});

export const getProducts = () => dispatch => {
    return productsService.getProducts()
        .then(productsReceived)
        .catch(() => processFailed('There was an error while receiving products.'))
        .then(dispatch);
};

export const getProduct = (id) => dispatch => {
  return productsService.getProduct(id)
      .then(productReceived)
      .catch(() => processFailed('There was an error while receiving product.'))
      .then(dispatch);
};

export const removeProduct = (productId) => dispatch => {
    return productsService.removeProduct(productId)
        .then(() => productWasRemoved(productId))
        .catch(() => processFailed('There was an error while deleting product.'))
        .then(dispatch);
};

export const updateProduct = (product) => dispatch => {
    return productsService.updateProduct(product)
        .then((product) => productWasUpdated(product))
        .catch(() => processFailed('There was an error while updating product.'))
        .then(dispatch);
};

export const addProduct = (product) => dispatch => {
  return productsService.addProduct(product)
      .then((product) => productWasAdded(product))
      .catch(() => processFailed('There was an error while adding product.'))
      .then(dispatch);
};