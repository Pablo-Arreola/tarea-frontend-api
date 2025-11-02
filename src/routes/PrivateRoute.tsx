import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactElement } from "react";

/**
 * 🔒 Protege rutas que requieren usuario autenticado.
 * Si no hay token o usuario, redirige al login.
 */
export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
