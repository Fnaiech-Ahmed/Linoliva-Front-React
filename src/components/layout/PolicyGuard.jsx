// src/components/layout/PolicyGuard.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import Forbidden from "../../pages/Forbidden";

export default function PolicyGuard({ policy, children }) {
    const { user } = useAuth();
    if (!user) return <Forbidden />;
    if (Array.isArray(user.policy) && user.policy.includes(policy)) return children;
    return <Forbidden />;
}
