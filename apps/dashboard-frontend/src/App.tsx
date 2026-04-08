import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Credits } from "./pages/Credits";
import { ApiKeys } from "./pages/ApiKeys";
import { LandingPage } from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LandingPage />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/credits'} element={< Credits />} />
          <Route path={'/apikeys'} element={<ApiKeys />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
