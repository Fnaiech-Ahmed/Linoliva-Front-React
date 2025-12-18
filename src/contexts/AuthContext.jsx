// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../utils/jwt.util";
import { tokenService } from "../services/token.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = tokenService.getToken();
        if (!token) return null;
        if (isTokenExpired(token)) {
            tokenService.removeToken();
            return null;
        }
        return decodeToken(token);
    });

    useEffect(() => {
        // possibilité: refresh token check if you implement refresh flow
    }, []);

    const login = (token) => {
        tokenService.saveToken(token);
        setUser(decodeToken(token));
    };

    const logout = () => {
        tokenService.removeToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
