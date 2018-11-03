let SESSION_TOKEN = null;

export default {
    login: (user) => {
        return fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            const sessionToken = res.headers.get('session-token');
            localStorage.setItem('sessionToken', sessionToken);
            SESSION_TOKEN = sessionToken;
            return res.json();
        });
    },

    getProducts: () => {
        return fetch('api/products', {
            method: 'get',
            headers: {
                'session-token': SESSION_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
}
