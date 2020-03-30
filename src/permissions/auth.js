import Cookies from 'js-cookie'

const TOKEN_KEY = 'login_user';

export function getToken() {
    var user = Cookies.get(TOKEN_KEY);
    return user ? JSON.parse(user) : null;
}

export function setToken(token) {
    Cookies.set(TOKEN_KEY, token, 15);
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY);
}