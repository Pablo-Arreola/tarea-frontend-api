export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "Tecnico" | "Coordinador";
  activo: boolean;
  fechaCreacion?: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
