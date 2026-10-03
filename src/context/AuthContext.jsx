import { createContext, useContext, useState, useCallback } from "react";

// Mock users — swap login() body for a real fetch() call when backend is ready
const MOCK_USERS = [
  {
    id: "u1", name: "Kwame Mensah", email: "buyer@test.com", password: "buyer123",
    phone: "+233 24 000 0001", avatarInitials: "KM", role: "buyer", storeId: null,
  },
  {
    id: "u2", name: "Abena Osei", email: "seller@test.com", password: "seller123",
    phone: "+233 24 000 0002", avatarInitials: "AO", role: "seller", storeId: 1,
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = guest (not signed in)
  const [user, setUser] = useState(null);

  const isGuest  = user === null;
  const isBuyer  = user?.role === "buyer";
  const isSeller = user?.role === "seller";
  const role     = user?.role ?? "guest";

  // Returns { ok: true } or { ok: false, error: string }
  const login = useCallback(({ email, password }) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Incorrect email or password." };
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  // Called after store creation — promotes a buyer to seller
  const upgradeToSeller = useCallback((storeId) => {
    setUser((prev) => prev ? { ...prev, role: "seller", storeId } : prev);
  }, []);

  // Merge changed fields into current user (e.g. after profile edit)
  const updateProfile = useCallback((fields) => {
    setUser((prev) => prev ? { ...prev, ...fields } : prev);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, role, isGuest, isBuyer, isSeller,
      login, logout, upgradeToSeller, updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage: const { user, role, login, logout } = useAuth();
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
