import { allCategory } from "./categories";

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const DEFAULT_FILTER = {
    name: '',
    availableOnly: false,
    gender: 'All',
    category: allCategory.id,
    rating: {
        from: 0,
        to: 5
    },
    price: {
        from: 0,
        to: 1000
    }
};