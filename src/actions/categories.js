import categoriesService from '../services/categories';
import { CATEGORIES_RECEIVED } from "../constants/categories";
import { PROCESS_WAS_FAILED } from '../constants/error';

const categoriesReceived = (categories) => ({
    type: CATEGORIES_RECEIVED,
    categories
});

const processFailed = (message) => ({
  type: PROCESS_WAS_FAILED,
  message
});

export const getCategories = () => dispatch => {
    return categoriesService.getCategories()
        .then(categoriesReceived)
        .catch(() => processFailed('There was an error while receiving categories.'))
        .then(dispatch);
};