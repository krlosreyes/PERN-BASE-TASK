import { Link, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./navigation.js";
import Container from "../ui/container.jsx";
import { useAuth } from "../../context/useAuth.js";

function Navbar() {
  const location = useLocation();
  const { isAuth, signOut } = useAuth();
  return (
    <Container className="flex items-center justify-center">
      <nav className="bg-zinc-950 font-serif  text-white p-4 shadow-lg flex justify-between items-center">
        {/* Título del proyecto con un estilo destacado */}
        <h1 className="text-green-600 text-2xl font-bold tracking-wide">
          <Link to="/">P E R N - Base - Task</Link>
        </h1>

        {/* Contenedor para la lista de navegación con espacio entre elementos */}
        <ul className="flex space-x-6">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={`${
                      location.pathname === path
                        ? "text-green-600 font-semibold border-b-2 border-white-600"
                        : "text-white hover:text-green-600 transition-colors duration-300"
                      // Colores para un efecto profesional en hover
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li
                className="text-red-500 hover:text-green-600 transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                LogOut
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={`${
                    location.pathname === path
                      ? "text-green-600 font-semibold border-b-2 border-white-600"
                      : "text-white hover:text-green-600 transition-colors duration-300"
                    // Colores para un efecto profesional en hover
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </Container>
  );
}

export default Navbar;
