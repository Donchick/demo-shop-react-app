import {CATEGORIES_RECEIVED, CATEGORIES_RECEIVING_ERROR} from "../constants/categories";

const categories = (state = [], action) => {
    switch (action.type) {
        case CATEGORIES_RECEIVED:
            return action.categories;

        default:
            return state
    }
};

export default categories;