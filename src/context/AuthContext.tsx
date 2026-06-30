import { createContext, useContext, useState } from "react";
import { getUsers } from "../services/UsuarioService";
import type { AuthContextType, LoginData } from "../types/auth";
import type { User } from "../types/users";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

async function login(data: LoginData): Promise<boolean> {
  const users = await getUsers();

  const foundUser = users.find(
    (user) => user.nickName === data.nickName
  );

  if (foundUser && data.password === "123456") {
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return true;
  }

  return false;
}

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}