import { UPDATE_FILTER, DEFAULT_FILTER } from "../constants/filter";

const filter = (state = DEFAULT_FILTER, action) => {
    switch (action.type) {
        case UPDATE_FILTER:
            return Object.assign({}, state, action.fieldToUpdate);

        default:
            return state
    }
};

export default filter;