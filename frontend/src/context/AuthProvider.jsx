import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookie from "js-cookie";
import axios from "../api/axios.js";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);

  const signUp = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.error("Error during signUp:", error);
      handleErrors(error);
    }
  };

  const signIn = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.error("Error during signIn:", error);
      handleErrors(error);
    }
  };

  const signOut = async () => {
    try {
      await axios.post("/signout");
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error("Error during signOut:", error);
    }
  };

  const handleErrors = (error) => {
    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else if (error.response.data.error?.message) {
        setErrors([{ message: error.response.data.error.message }]);
      } else {
        setErrors([
          {
            message:
              error.response.data.message || "An unexpected error occurred.",
          },
        ]);
      }
    } else {
      setErrors([{ message: "An unexpected error occurred. Please try again." }]);
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
          console.error("Error fetching profile:", err);
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
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Validar los props con PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
