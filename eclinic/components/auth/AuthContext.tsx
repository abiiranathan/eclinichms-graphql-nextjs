import { createContext, useContext } from "react";
import { LoginUser_login_user } from "../../graphql/schema";

export interface AuthContextType {
  user: LoginUser_login_user;
  login: (user: LoginUser_login_user) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(undefined!);

export const useAuth = () => useContext(AuthContext);
