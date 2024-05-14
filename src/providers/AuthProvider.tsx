import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface AuthContext {
  isAuthenticated: boolean;
  logout: () => void;
  user: string | undefined;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | undefined>(undefined);
  const isAuthenticated = !!user;
  const auth = getAuth();

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }, [auth]);

  useEffect(() => {
    //onAuthStateChanged check if the user is still logged in or not
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user?.uid);
    });
    return unsubscribe;
  }, [auth]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
