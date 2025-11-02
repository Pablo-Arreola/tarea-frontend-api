import { useForm, type SubmitHandler } from "react-hook-form";
import { createIndicio, updateIndicio } from "../services/indicios.api";
import { useParams } from "react-router-dom";
import type { Indicio } from "../types/indicio";

interface Props {
  indicioId?: number;
  onSuccess?: () => void;
}

export default function IndicioForm({ indicioId, onSuccess }: Props) {
  // 👇 le decimos a react-hook-form que nuestro formulario usa el tipo Indicio
  const { register, handleSubmit } = useForm<Indicio>();
  const { id: expediente_id } = useParams();

  // 👇 también tipamos correctamente el submit handler
  const onSubmit: SubmitHandler<Indicio> = async (data) => {
    try {
      const payload = { ...data, expediente_id: Number(expediente_id) };

      if (indicioId) {
        await updateIndicio(indicioId, payload);
        alert("Indicio actualizado ✅");
      } else {
        await createIndicio(payload);
        alert("Indicio creado ✅");
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Error al guardar indicio");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-blue-700 mb-3">
        {indicioId ? "Editar Indicio" : "Nuevo Indicio"}
      </h2>

      <input
        {...register("codigo")}
        placeholder="Código del indicio"
        className="border p-2 mb-2 w-full rounded"
        required
      />
      <textarea
        {...register("descripcion")}
        placeholder="Descripción"
        className="border p-2 mb-2 w-full rounded"
        required
      />
      <input
        {...register("peso", { valueAsNumber: true })} // 👈 convierte el valor a número
        type="number"
        step="0.01"
        min="0"
        placeholder="Peso (kg)"
        className="border p-2 mb-2 w-full rounded"
        required
      />
      <input
        {...register("color")}
        placeholder="Color"
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        {...register("tamano")}
        placeholder="Tamaño"
        className="border p-2 mb-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full"
      >
        Guardar
      </button>
    </form>
  );
}
