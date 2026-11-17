import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { api } from "../lib/api";
import { ROUTES, APP_NAME } from "../lib/constants";
import { useAuth } from "../lib/auth";
import Avatar from "./Avatar";

const navItems = [
  { to: ROUTES.discover, label: "Discover", icon: "✳" },
  { to: ROUTES.requests, label: "Requests", icon: "♡" },
  { to: ROUTES.connections, label: "Connections", icon: "⌘" },
  { to: ROUTES.profile, label: "My profile", icon: "◉" },
];

export default function Shell({ children }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  async function logout() {
    setLoggingOut(true);
    try { await api.logout(); } finally { setUser(null); navigate("/auth"); }
  }
  return <div className="min-h-screen bg-[#faf9f6] text-stone-900">
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#faf9f6]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <NavLink to="/discover" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-500 text-xl font-black text-white">d</span><span className="text-lg font-extrabold tracking-tight">{APP_NAME}<span className="text-rose-500">.</span></span></NavLink>
        <nav className="hidden items-center gap-1 md:flex">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${isActive ? "bg-white text-rose-600 shadow-sm ring-1 ring-stone-200/80" : "text-stone-500 hover:bg-white hover:text-stone-900"}`}><span className="text-base">{item.icon}</span>{item.label}</NavLink>)}</nav>
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="flex items-center gap-3 rounded-full border border-stone-200 bg-white py-1.5 pl-1.5 pr-3 hover:border-stone-300"><Avatar person={user} size="sm" className="ring-0"/><span className="hidden text-sm font-semibold sm:block">{user?.firstName}</span><span className="text-xs text-stone-400">⌄</span></button>
          <ul tabIndex={0} className="menu dropdown-content z-[40] mt-3 w-52 rounded-2xl border border-stone-100 bg-white p-2 shadow-xl"><li><NavLink to="/profile">Edit profile</NavLink></li><li><button onClick={logout} disabled={loggingOut}>{loggingOut ? "Signing out…" : "Sign out"}</button></li></ul>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-8 pb-28 sm:px-8 md:py-10">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-stone-200 bg-white/95 px-2 py-2 pb-[max(.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex min-w-16 flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[11px] font-semibold ${isActive ? "text-rose-600" : "text-stone-400"}`}><span className="text-xl">{item.icon}</span>{item.label}</NavLink>)}</nav>
  </div>;
}
