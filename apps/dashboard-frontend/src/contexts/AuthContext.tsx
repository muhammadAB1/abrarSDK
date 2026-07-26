import { createContext, useContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { url } from "@/url";

export type AuthUser = {
  id: number;
  email: string;
  credits: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);


async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch(`${url}/openrouter/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log("first");
  const queryClient = useQueryClient();


  const { data: user = null, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchMe,
    retry: false,
    staleTime: Infinity,
    // enabled: 
    refetchOnWindowFocus: false,
  });

  async function refresh() {
    await refetch();
  }

  async function logout() {
    await fetch(`${url}/openrouter/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    queryClient.setQueryData(['auth'], null);
  }

  if (isLoading) {
    return (
      <div className="dark min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
