import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { api } from "./lib/api";
import { AuthContext } from "./lib/auth";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api.profile().then(setUser).catch(() => setUser(null)).finally(() => setChecking(false));
  }, []);

  if (checking) return <div className="grid min-h-screen place-items-center bg-[#faf9f6]"><span className="loading loading-spinner loading-lg text-rose-500" /></div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/discover" replace /> : <AuthPage />} />
        <Route path="/*" element={user ? <Dashboard /> : <Navigate to="/auth" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
