import api from './api';

export default {
    getCategories() {
        return api.get('categories')
            .then(res => res.json())
    },
}