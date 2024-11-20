import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);

  const signUp = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      console.log(res.data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      console.log("Full error object:", error);

      // Verificamos si el error tiene respuesta y datos
      if (error.response && error.response.data) {
        console.log("Error response data:", error.response.data);

        // Si error.response.data.error es un array, lo asignamos directamente a setErrors
        if (Array.isArray(error.response.data.error)) {
          return setErrors(error.response.data.error);
        }

        // Si error.response.data.error contiene un solo mensaje
        if (error.response.data.error && error.response.data.error.message) {
          setErrors([{ message: error.response.data.error.message }]);
        } else {
          // Por si acaso, mostramos el mensaje en error.response.data si existe
          setErrors([
            {
              message:
                error.response.data.message || "An unexpected error occurred",
            },
          ]);
        }
      } else {
        // En caso de que no haya datos en error.response, mostramos un error general
        setErrors([
          { message: "An unexpected error occurred. Please try again." },
        ]);
      }
    }
  };

  const signIn = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      console.log("Full error object:", error);

      // Verificamos si el error tiene respuesta y datos
      if (error.response && error.response.data) {
        console.log("Error response data:", error.response.data);

        // Si error.response.data.error es un array, lo asignamos directamente a setErrors
        if (Array.isArray(error.response.data.error)) {
          return setErrors(error.response.data.error);
        }

        // Si error.response.data.error contiene un solo mensaje
        if (error.response.data.error && error.response.data.error.message) {
          setErrors([{ message: error.response.data.error.message }]);
        } else {
          // Por si acaso, mostramos el mensaje en error.response.data si existe
          setErrors([
            {
              message:
                error.response.data.message || "An unexpected error occurred",
            },
          ]);
        }
      } else {
        // En caso de que no haya datos en error.response, mostramos un error general
        setErrors([
          { message: "An unexpected error occurred. Please try again." },
        ]);
      }
    }
  };

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          setIsAuth(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signUp,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
