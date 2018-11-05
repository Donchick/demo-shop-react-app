let isUserLoggedIn = false;

const _getUser = function (username) {
    const sessionToken = localStorage.getItem('session-token');
    return fetch(`/api/users?login=${username}`, {
        method: 'get',
        headers: {
            "session-token": sessionToken
        }
    }).then(res => res.json())
    .then(users => users[0]);

};

const _getUserRole = function (roleId) {
    const sessionToken = localStorage.getItem('session-token');
    return fetch(`/api/roles?id=${roleId}`, {
        method: 'get',
        headers: {
            "session-token": sessionToken
        }
    }).then(res => res.json())
    .then(roles => roles[0]);
};

export default {
    login: (user) => {
        let userModel = null;
        return fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            const sessionToken = res.headers.get('session-token');
            if (sessionToken) {
                localStorage.setItem('session-token', sessionToken);
            }

            return user;
        }).then((user) => _getUser(user.login))
        .then((user) => {
            userModel = {
                login: user.login,
            };
            return user;
        })
        .then((user) => _getUserRole(user.roleId))
        .then((role) => {
            userModel.isAdmin = role.name === 'Admin';
            localStorage.setItem('user', JSON.stringify(userModel));
            return userModel;
        })
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
                localStorage.setItem('user', null);
                isUserLoggedIn = false;
            }

            return res.json();
        });
    }
}