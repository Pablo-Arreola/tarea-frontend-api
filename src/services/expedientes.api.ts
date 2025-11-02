import { apiFetch } from "./http";
import type { Expediente } from "../types/expediente";

// Listar expedientes
export const getExpedientes = async (): Promise<Expediente[]> => {
  return await apiFetch("/expedientes");
};

// Crear expediente
export const createExpediente = async (expediente: Partial<Expediente>) => {
  return await apiFetch("/expedientes", {
    method: "POST",
    body: JSON.stringify(expediente),
  });
};

// Actualizar expediente
export const updateExpediente = async (id: number, data: Partial<Expediente>) => {
  return await apiFetch(`/expedientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Cambiar estado (coordinador)
export const changeEstadoExpediente = async (
  id: number,
  estado: "aprobado" | "rechazado",
  justificacion: string
) => {
  return await apiFetch(`/expedientes/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ estado, justificacion }),
  });
};

// Activar o desactivar expediente
export const toggleActivoExpediente = async (id: number, activo: boolean) => {
  return await apiFetch(`/expedientes/${id}/activo`, {
    method: "PATCH",
    body: JSON.stringify({ activo }),
  });
};
