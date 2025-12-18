// src/components/layout/RoleGuard.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import Forbidden from "../../pages/Forbidden";

export default function RoleGuard({ role, children }) {
    const { user } = useAuth();
    if (!user) return <Forbidden />;
    // Le token a "role" claim et "policy" tableau
    if (user.role && user.role === role) return children;
    return <Forbidden />;
}
