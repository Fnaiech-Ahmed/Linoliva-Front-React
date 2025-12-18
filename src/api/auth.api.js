// src/api/auth.api.js
import api from "./axiosConfig";

export const loginRequest = async (email, password) => {
    let Username;
    Username = email;
    let Password;
    Password = password;

    // CORRECTION : Retirez le préfixe /api du chemin
    const res = await api.post("/Auth/login", { Username, Password });

    return res.data; // { token: "..." }
};
