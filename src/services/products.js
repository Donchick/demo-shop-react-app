import api from './api';

export default {
    getProducts() {
        return api.get('products')
            .then(res => res.json())
    },

    removeProduct(productId) {
        return api.delete('products', productId)
            .then(res => res.json())
    }
}