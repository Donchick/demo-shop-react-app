import api from './api';

export default {
    getProducts() {
        return api.get('products')
            .then(res => res.json());
    },

    getProduct(id) {
      if (isNaN(id)) {
          return Promise.reject('Product id is incorrect');
      }
      return api.get(`products/${id}`)
          .then(res => res.json());
    },

    removeProduct(productId) {
        return api.delete('products', productId)
            .then(res => res.json());
    },

    addProduct(product) {
        return api.post('products', product)
            .then(res => res.json());
    },

    updateProduct(product) {
      return api.put(`products/${product.id}`, product)
          .then(res => res.json());
    }
}