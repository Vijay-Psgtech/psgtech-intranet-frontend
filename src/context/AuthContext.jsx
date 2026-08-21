import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/auth/me`, {
                credentials: "include",
            });
            const data = await res.json();
            const fetchedUser = data?.user ?? null;
            if (fetchedUser) {
                setUser(fetchedUser);
            } else {
                throw new Error("User not found");
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);
    // ── Initial Load ──────────────────────
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // ── Login ──────────────────────
    const login = useCallback(
        async (userData) => {
            setUser(userData);
            setLoading(false);
            // Refresh from server
            try {
                await fetchUser();
            } catch (error) {
                console.error("Error refreshing user data:", error);
            }
        },
        [fetchUser]
    );

    // ── Logout ──────────────────────
    const logout = useCallback(async () => {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Error logging out:", error);
        }
    })


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error(
      "useAuth must be used inside <AuthProvider>"
    );
  return ctx;
}
