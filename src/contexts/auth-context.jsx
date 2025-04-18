import { element } from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkAuthStatus } from "../utils/authenticators.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuthStatus();
        setUser(data.user);
      } catch {
        setUser(null);
      }
      setFetching(false);
    };

    verifyAuth();
  }, []);

  const signOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
    navigate("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {!fetching ? children : <p>Fetching data ...</p>}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = { children: element };
