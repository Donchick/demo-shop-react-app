export default {
    getProducts() {
        const sessionToken = localStorage.getItem('session-token');
        return fetch('/api/products', {
            method: 'get',
            headers: {
                "session-token": sessionToken
            }
        }).then(res => res.json())
    }
}