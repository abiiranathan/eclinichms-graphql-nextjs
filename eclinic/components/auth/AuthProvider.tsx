import Login from "../../pages/login";
import { AuthContext, AuthContextType } from "./AuthContext";

interface Props {
  children: React.ReactNode;
  auth: AuthContextType;
}

export const AuthProvider = ({ children, auth }: Props) => {
  return (
    <AuthContext.Provider value={auth}>
      {auth.user ? <>{children}</> : <Login />}
    </AuthContext.Provider>
  );
};
