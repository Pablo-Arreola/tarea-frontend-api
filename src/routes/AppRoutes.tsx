import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Expedientes from "../pages/Expedientes";
import RevisarExpedientes from "../pages/RevisarExpedientes";
import { PrivateRoute } from "./PrivateRoute";
import { RoleRoute } from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 🔐 Solo usuarios autenticados */}
      <Route
        path="/expedientes"
        element={
          <PrivateRoute>
            <Expedientes />
          </PrivateRoute>
        }
      />

      {/* 🧠 Solo Coordinador */}
      <Route
        path="/revisar"
        element={
          <RoleRoute role="Coordinador">
            <RevisarExpedientes />
          </RoleRoute>
        }
      />

      {/* 🚫 Rutas no válidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
