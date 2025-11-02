import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import type { LoginCredentials } from "../types/auth";

export default function Login() {
  // 👇 le pasamos el tipo LoginCredentials a useForm
  const { register, handleSubmit } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch {
      alert("Credenciales inválidas ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 to-cyan-400">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Iniciar sesión
        </h1>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Correo"
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Contraseña"
          className="border p-2 mb-3 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
