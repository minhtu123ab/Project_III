import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

const PrivateAdmin = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const isAdmin = decodedToken?.isAdmin;

  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateAdmin;
