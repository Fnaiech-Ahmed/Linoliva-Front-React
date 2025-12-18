// src/services/token.service.js
const TOKEN_KEY = "token";

export const tokenService = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    saveToken: (t) => localStorage.setItem(TOKEN_KEY, t),
    removeToken: () => localStorage.removeItem(TOKEN_KEY),
};
