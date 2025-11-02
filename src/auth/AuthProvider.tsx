import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";
import { loginRequest } from "../services/auth.api";

/**
 * 🌐 Proveedor de autenticación global
 * Maneja login, logout, persistencia y redirección automática.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔁 Cargar sesión previa del LocalStorage al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      console.log("✅ Sesión restaurada:", JSON.parse(savedUser));
    }
  }, []);

  // 🔐 Login con redirección automática
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await loginRequest(email, password);
      console.log("🔍 Respuesta del backend:", data);

      if (data?.token && data?.usuario) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));

        setToken(data.token);
        setUser(data.usuario);
        console.log("✅ Usuario guardado:", data.usuario);

        // 🚀 Redirigir según rol
        if (data.usuario.rol === "Coordinador") {
          window.location.href = "/revisar";
        } else {
          window.location.href = "/expedientes";
        }
      } else {
        throw new Error("Credenciales inválidas o respuesta incorrecta");
      }
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error;
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  // 📦 Contexto
  const value: AuthContextType = { user, token, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
