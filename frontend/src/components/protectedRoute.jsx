import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types"; // Asegúrate de importar PropTypes

export const ProtectedRoute = ({ redirectTo = "/", isAllowed, children }) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children || <Outlet />;
};

// Validación de props con PropTypes
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,    // 'redirectTo' debe ser un string (opcional)
  isAllowed: PropTypes.bool.isRequired, // 'isAllowed' debe ser un booleano y es obligatorio
  children: PropTypes.node,         // 'children' debe ser un nodo React (opcional)
};

export default ProtectedRoute;


