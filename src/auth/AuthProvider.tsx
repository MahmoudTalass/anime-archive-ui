import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface UserInfo {
   id: string;
   username: string;
   email: string;
   token: string;
}

interface AuthContextType {
   userInfo: UserInfo | null;
   login: (userInfo: UserInfo) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
   const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);

   const login = (userInfo: UserInfo) => {
      setUserInfo(userInfo);
   };

   const logout = () => {
      setUserInfo(null);
   };

   return (
      <AuthContext.Provider value={{ login, logout, userInfo }}>{children}</AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
