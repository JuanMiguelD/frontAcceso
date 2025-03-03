import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userType: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
      setIsAuthenticated(false);
      sessionStorage.removeItem("accessToken"); // 🔥 Borra el token vencido
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, setIsAuthenticated, userType, setUserType, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
}
