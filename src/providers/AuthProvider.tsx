import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUserRole } from '../services/auth';
import { auth } from '../config/firebase-config';

interface User {
  id: string;
  fullname: string | undefined | null;
  isAdmin: boolean | undefined;
}

export interface AuthContext {
  isAuthenticated: boolean;
  logout: () => void;
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    //onAuthStateChanged check if the user is still logged in or not
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { isAdmin } = await getUserRole(user.uid);
        setUser({
          id: user?.uid,
          fullname: user?.displayName,
          isAdmin: isAdmin,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, isLoading }}>
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
