import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-blue-700 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Página no encontrada o no tienes permisos para acceder.
      </p>
      <Link
        to="/"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
