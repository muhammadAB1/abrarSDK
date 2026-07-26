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

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/apikeys" element={<ApiKeys />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<Navigate to="/signin" replace />} />
          <Route path="/credits" element={<Navigate to="/signin" replace />} />
          <Route path="/apikeys" element={<Navigate to="/signin" replace />} />
        </>
      )}
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