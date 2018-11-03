let isUserLoggedIn = false;

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
            if (sessionToken) {
                localStorage.setItem('sessionToken', sessionToken);
                isUserLoggedIn = true;
            }

            return user;
        });
    },

    isUserLoggedIn: () => {
        return isUserLoggedIn;
    },

    logout: (user) => {
        const sessionToken = localStorage.getItem('session-token');
        return fetch('/api/logout', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "session-token": sessionToken
            }
        }).then(res => {
            if (sessionToken) {
                localStorage.setItem('sessionToken', null);
                isUserLoggedIn = false;
            }

            return res.json();
        });
    }
}