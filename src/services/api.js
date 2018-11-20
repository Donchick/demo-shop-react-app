function getSessionToken() {
    const token = localStorage.getItem('session-token');
    if (!token) {
        throw new Error('Unauthorized');
    }

    return token;
}

export default {
    get(path, query) {
        const sessionToken = getSessionToken();
        return fetch(`/api/${path + (query ? '?' + query : '')}`, {
            method: 'get',
            headers: {
                "session-token": sessionToken
            }
        });
    },

    put(path, body) {
      const sessionToken = getSessionToken();
      return fetch(`/api/${path}`, {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "session-token": sessionToken
        }
      });
    },

    post(path, body) {
        const sessionToken = path === 'login' ? null : getSessionToken();
        return fetch(`/api/${path}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "session-token": sessionToken
            }
        });
    },

    delete(path, id) {
        const sessionToken = getSessionToken();
        return fetch(`/api/${path}/${id}`, {
            method: 'delete',
            headers: {
                "session-token": sessionToken
            }
        });
    }
}