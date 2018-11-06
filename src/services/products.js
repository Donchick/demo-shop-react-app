import api from './api';

export default {
    getProducts() {
        return api.get('products')
            .then(res => res.json())
    }
}