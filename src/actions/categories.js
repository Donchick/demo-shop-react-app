import categoriesService from '../services/categories';
import { CATEGORIES_RECEIVED, CATEGORIES_RECEIVING_ERROR } from "../constants/categories";

const categoriesReceived = (categories) => ({
    type: CATEGORIES_RECEIVED,
    categories
});

const categoriesReceivingError = (error) => ({
    type: CATEGORIES_RECEIVING_ERROR,
    error
});

export const getCategories = () => dispatch => {
    return categoriesService.getCategories()
        .then(categoriesReceived)
        .catch(categoriesReceivingError)
        .then(dispatch);
};