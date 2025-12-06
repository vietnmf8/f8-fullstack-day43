import { useMeQuery } from "@/services/auth";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function Navigate({ to }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    }, [to, navigate]);
}

// eslint-disable-next-line react/prop-types
function Private({ children }) {
    const { isError, isLoading } = useMeQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default Private;
