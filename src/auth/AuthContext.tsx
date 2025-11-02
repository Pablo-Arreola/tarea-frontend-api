import { createContext } from "react";

export interface User {
  id: number;
  rol: "Tecnico" | "Coordinador";
  nombre: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
