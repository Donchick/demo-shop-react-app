import { UPDATE_FILTER } from "../constants/filter";

const updateFilterState = (fieldToUpdate) => ({
    type: UPDATE_FILTER,
    fieldToUpdate
});

export const updateFilter = (fieldToUpdate) => dispatch => {
    dispatch(updateFilterState(fieldToUpdate));
};