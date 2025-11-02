import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndiciosByExpediente } from "../services/indicios.api";
import type { Indicio } from "../types/indicio";

export default function ExpedienteDetalle() {
  const { id } = useParams();
  const [indicios, setIndicios] = useState<Indicio[]>([]);

  useEffect(() => {
    if (id) loadIndicios(Number(id));
  }, [id]);

  const loadIndicios = async (expedienteId: number) => {
    const data = await getIndiciosByExpediente(expedienteId);
    setIndicios(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-3">
        🔎 Detalle del Expediente #{id}
      </h1>

      <h2 className="text-xl font-semibold mb-2">Indicios asociados</h2>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Código</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Peso</th>
            <th className="p-2">Activo</th>
          </tr>
        </thead>
        <tbody>
          {indicios.map((i) => (
            <tr key={i.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{i.codigo}</td>
              <td className="p-2">{i.descripcion}</td>
              <td className="p-2">{i.peso}</td>
              <td className="p-2">{i.activo ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
