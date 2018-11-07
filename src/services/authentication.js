import api from './api';

const _getUser = function (username) {
    return api.get('users', `login=${username}`)
        .then(res => res.json())
        .then(users => users[0]);

};

const _getUserRole = function (roleId) {
    return api.get('roles', `id=${roleId}`)
        .then(res => res.json())
        .then(roles => roles[0]);
};

export default {
    login: (user) => {
        let userModel = null;
        return api.post('login', user).then(res => {
            const sessionToken = res.headers.get('session-token');
            if (sessionToken) {
                localStorage.setItem('session-token', sessionToken);
            }

            return user;
        })
            .then((user) => _getUser(user.login))
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
            });
    },

    logout: (user) => {
        const sessionToken = localStorage.getItem('session-token');
        return api.post('logout', user)
            .then(res => {
            if (sessionToken) {
                localStorage.setItem('sessionToken', null);
                localStorage.setItem('user', null);
            }

            return res.json();
        });
    },

    getUser: () => {
        const userJson =  localStorage.getItem('user');

        return userJson && JSON.parse(userJson);
    }
}