import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
