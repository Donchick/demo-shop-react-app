import {CATEGORIES_RECEIVED} from "../constants/categories";

const categories = (state = [], action) => {
    switch (action.type) {
        case CATEGORIES_RECEIVED:
            return action.categories;

        default:
            return state
    }
};

export default categories;