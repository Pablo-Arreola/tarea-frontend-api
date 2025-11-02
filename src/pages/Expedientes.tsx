import { useEffect, useState } from "react";
import { getExpedientes, toggleActivoExpediente } from "../services/expedientes.api";
import type { Expediente } from "../types/expediente";
import { useAuth } from "../auth/useAuth";

export default function Expedientes() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadExpedientes();
  }, []);

  const loadExpedientes = async () => {
    const data = await getExpedientes();
    setExpedientes(data);
  };

  const handleToggle = async (id: number, activo: boolean) => {
    if (confirm(`¿Seguro que deseas ${activo ? "desactivar" : "activar"} este expediente?`)) {
      await toggleActivoExpediente(id, !activo);
      loadExpedientes();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📁 Expedientes</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Activo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((exp) => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{exp.codigo}</td>
                <td className="p-2">{exp.descripcion}</td>
                <td className="p-2 capitalize">{exp.estado}</td>
                <td className="p-2">
                  {exp.activo ? "✅ Activo" : "❌ Inactivo"}
                </td>
                <td className="p-2 flex gap-2">
                  {user?.rol === "Coordinador" && (
                    <button
                      onClick={() => handleToggle(exp.id, exp.activo)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      {exp.activo ? "Desactivar" : "Activar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
