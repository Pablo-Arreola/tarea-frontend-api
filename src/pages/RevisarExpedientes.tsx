import { useEffect, useState } from "react";
import { getExpedientes, changeEstadoExpediente } from "../services/expedientes.api";
import type { Expediente } from "../types/expediente";

/**
 * Página exclusiva para el coordinador.
 * Permite revisar y aprobar/rechazar expedientes pendientes.
 */
export default function RevisarExpedientes() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [justificacion, setJustificacion] = useState("");

  // 🔹 Cargar expedientes al montar el componente
  useEffect(() => {
    void loadExpedientes();
  }, []);

  const loadExpedientes = async () => {
    try {
      const data = await getExpedientes();
      // Filtrar solo pendientes
      setExpedientes(data.filter((e) => e.estado === "pendiente"));
    } catch (error) {
      console.error("Error al cargar expedientes:", error);
      alert("No se pudieron cargar los expedientes ❌");
    }
  };

  const handleAccion = async (id: number, estado: "aprobado" | "rechazado") => {
    const texto = prompt(
      `Ingrese justificación para marcar como ${estado}:`,
      justificacion
    );
    if (!texto) return;

    try {
      await changeEstadoExpediente(id, estado, texto);
      alert(`Expediente ${estado} correctamente ✅`);
      setJustificacion(""); // limpiar
      void loadExpedientes();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al actualizar estado ❌");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        🧾 Revisar Expedientes Pendientes
      </h1>

      {expedientes.length === 0 ? (
        <p className="text-gray-600">No hay expedientes pendientes.</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-md overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((exp) => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{exp.codigo}</td>
                <td className="p-2">{exp.descripcion}</td>
                <td className="p-2">{exp.estado}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => void handleAccion(exp.id, "aprobado")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => void handleAccion(exp.id, "rechazado")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
