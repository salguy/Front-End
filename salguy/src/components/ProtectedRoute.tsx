import { Navigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
      fetch(`${API_URL}/api/user/verify`, {
        credentials: "include",
      })
        .then((res) => setIsAuthenticated(res.ok))
        .catch(() => setIsAuthenticated(false))
        .finally(() => setIsLoading(false));
    }, []);
  
    if (isLoading) return <div>로딩 중...</div>;
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return <>{children}</>;
  }