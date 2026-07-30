import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// @ts-ignore
import "./index.css";
import Signup from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Credits } from "./pages/Credits";
import { ApiKeys } from "./pages/ApiKeys";
import { LandingPage } from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Zap } from "lucide-react";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="dark flex justify-center items-center h-screen bg-background">
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 border border-primary/20 animate-spin">
          <Zap className="size-5 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />}
      />
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signin />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />}
      />
      <Route
        path="/credits"
        element={isAuthenticated ? <Credits /> : <Navigate to="/signin" replace />}
      />
      <Route
        path="/apikeys"
        element={isAuthenticated ? <ApiKeys /> : <Navigate to="/signin" replace />}
      />
    </Routes>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;