import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <Link to="/" className="font-bold text-lg">
          🧾 Expedientes UMG
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>

        <div
          className={`md:flex md:items-center md:gap-6 absolute md:static left-0 w-full md:w-auto bg-blue-700 transition-all duration-200 ${
            open ? "top-14 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0">
            <Link to="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>

            {user && (
              <>
                <Link to="/expedientes" onClick={() => setOpen(false)}>
                  Expedientes
                </Link>

                {user.rol === "Coordinador" && (
                  <Link to="/revisar" onClick={() => setOpen(false)}>
                    Revisar
                  </Link>
                )}
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-white text-blue-700 px-3 py-1 rounded font-semibold hover:bg-gray-200"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded font-semibold hover:bg-gray-200"
              >
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
