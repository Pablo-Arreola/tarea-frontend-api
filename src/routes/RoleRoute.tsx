import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactElement } from "react";

/**
 * 🧩 Protege rutas según el rol del usuario.
 * Ejemplo: Solo “Coordinador” puede acceder a ciertas páginas.
 */
export const RoleRoute = ({
  role,
  children,
}: {
  role: "Tecnico" | "Coordinador";
  children: ReactElement;
}) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== role) {
    // ❌ Usuario autenticado pero sin permisos
    return <Navigate to="/" replace />;
  }

  return children;
};
