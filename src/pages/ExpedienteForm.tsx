import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createExpediente, updateExpediente } from "../services/expedientes.api";
import { useEffect } from "react";
import type { Expediente } from "../types/expediente";

export default function ExpedienteForm() {
 const { register, handleSubmit } = useForm<Expediente>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // 🔹 Aquí podrías cargar los datos si tu API soporta GET /expedientes/:id
    }
  }, [id]);

  const onSubmit = async (data: Expediente) => {
    try {
      if (id) {
        await updateExpediente(Number(id), data);
        alert("Expediente actualizado correctamente ✅");
      } else {
        await createExpediente(data);
        alert("Expediente creado correctamente ✅");
      }
      navigate("/expedientes");
    } catch (err) {
      console.error(err);
      alert("Error al guardar expediente");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 mt-10 rounded">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        {id ? "Editar Expediente" : "Nuevo Expediente"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-1 font-semibold">Código</label>
        <input
          {...register("codigo")}
          type="text"
          placeholder="EXP-001"
          className="border p-2 rounded w-full mb-3"
          required
        />

        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          {...register("descripcion")}
          placeholder="Descripción del expediente"
          className="border p-2 rounded w-full mb-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full"
        >
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
