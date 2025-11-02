import { apiFetch } from "./http";
import type { Indicio } from "../types/indicio";

// Listar indicios por expediente
export const getIndiciosByExpediente = async (
  expediente_id: number
): Promise<Indicio[]> => {
  return await apiFetch(`/expedientes/${expediente_id}/indicios`);
};

// Crear indicio
export const createIndicio = async (indicio: Partial<Indicio>) => {
  return await apiFetch("/indicios", {
    method: "POST",
    body: JSON.stringify(indicio),
  });
};

// Actualizar indicio
export const updateIndicio = async (id: number, data: Partial<Indicio>) => {
  return await apiFetch(`/indicios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Activar / Desactivar indicio
export const toggleActivoIndicio = async (id: number, activo: boolean) => {
  return await apiFetch(`/indicios/${id}/activo`, {
    method: "PATCH",
    body: JSON.stringify({ activo }),
  });
};
