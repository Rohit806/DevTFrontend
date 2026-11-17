import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./store/authSlice";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  const dispatch = useDispatch();
  const { user, sessionStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (sessionStatus === "loading") return <div className="grid min-h-screen place-items-center bg-[#faf9f6]"><span className="loading loading-spinner loading-lg text-rose-500" /></div>;

  return <Routes>
    <Route path="/auth" element={user ? <Navigate to="/discover" replace /> : <AuthPage />} />
    <Route path="/*" element={user ? <Dashboard /> : <Navigate to="/auth" replace />} />
  </Routes>;
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
