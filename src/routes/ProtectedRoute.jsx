import { element } from "prop-types";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/auth-context.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/sign-in" replace />;
}

ProtectedRoute.propTypes = {
  children: element.isRequired,
};
