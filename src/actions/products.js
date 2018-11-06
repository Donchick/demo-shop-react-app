import productsService from '../services/products';
import { PRODUCTS_RECEIVED, PRODUCTS_RECEIVING_ERROR } from "../constants/products";

const productsReceived = (products) => ({
    type: PRODUCTS_RECEIVED,
    products
});

const productsReceivingError = (error) => ({
    type: PRODUCTS_RECEIVING_ERROR,
    error
});

export const getProducts = () => dispatch => {
    return productsService.getProducts()
        .then(productsReceived)
        .catch(productsReceivingError)
        .then(dispatch);
}