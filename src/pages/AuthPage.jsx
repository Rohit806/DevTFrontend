import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GENDERS } from "../lib/constants";
import { clearAuthError, signIn, signUp } from "../store/authSlice";
import ThemeToggle from "../Components/ThemeToggle";

export default function AuthPage() {
  const dispatch = useDispatch();
  const { authStatus, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ firstName: "", lastName: "", emailId: "", password: "", age: "", gender: "", skills: "" });
  const busy = authStatus === "loading";
  const signup = mode === "signup";
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  async function submit(event) {
    event.preventDefault();
    if (signup) {
      const result = await dispatch(signUp({
        firstName: form.firstName.trim(), lastName: form.lastName.trim(), emailId: form.emailId.trim(),
        password: form.password, age: form.age ? Number(form.age) : undefined,
        gender: form.gender || undefined, skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      }));
      if (signUp.fulfilled.match(result)) navigate("/discover", { replace: true });
    } else {
      const result = await dispatch(signIn({ emailId: form.emailId.trim(), password: form.password }));
      if (signIn.fulfilled.match(result)) navigate("/discover", { replace: true });
    }
  }
  return <div className="relative grid min-h-screen bg-[#faf9f6] lg:grid-cols-[1fr_1fr]">
    <ThemeToggle className="fixed right-5 top-5 z-50 shadow-sm" />
    <section className="relative hidden overflow-hidden bg-[#292320] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
      <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl"/><div className="absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-orange-300/10 blur-3xl"/>
      <a href="/auth" className="relative flex items-center gap-3 text-lg font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-500 text-xl">d</span>DevTinder<span className="text-rose-400">.</span></a>
      <div className="relative max-w-xl"><p className="mb-5 text-sm font-bold uppercase tracking-[.24em] text-rose-300">Good people. Great projects.</p><h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">Your next<br/>great collaborator<br/><span className="text-rose-400">is out there.</span></h1><p className="mt-7 max-w-md text-lg leading-8 text-stone-300">Meet developers who get your ideas. Find your people, build something worth talking about.</p><div className="mt-12 flex items-center gap-4"><div className="flex -space-x-3">{["A", "J", "M", "S"].map((item, i) => <span key={item} className={`grid h-11 w-11 place-items-center rounded-full border-2 border-[#292320] text-sm font-bold text-stone-700 ${["bg-orange-200", "bg-sky-200", "bg-emerald-200", "bg-violet-200"][i]}`}>{item}</span>)}</div><p className="text-sm text-stone-300"><b className="text-white">Build your circle</b><br/>one connection at a time</p></div></div>
      <p className="relative text-xs text-stone-500">Made for the people who make the internet.</p>
    </section>
    <section className="flex items-center justify-center px-5 py-10 sm:px-10"><div className="w-full max-w-[440px]">
      <div className="mb-10 lg:hidden"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-500 text-xl font-black text-white">d</span><p className="mt-4 text-xl font-extrabold">DevTinder<span className="text-rose-500">.</span></p></div>
      <p className="text-sm font-bold uppercase tracking-[.18em] text-rose-500">{signup ? "Create your profile" : "Welcome back"}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">{signup ? "Find your people." : "Good to see you."}</h2><p className="mt-2 text-sm leading-6 text-stone-500">{signup ? "A great collaboration can start with a hello." : "Pick up where your next great collaboration begins."}</p>
      <div className="mt-7 grid grid-cols-2 rounded-xl bg-stone-100 p-1"><button onClick={() => { setMode("login"); dispatch(clearAuthError()); }} className={`rounded-lg py-2.5 text-sm font-bold ${!signup ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}>Sign in</button><button onClick={() => { setMode("signup"); dispatch(clearAuthError()); }} className={`rounded-lg py-2.5 text-sm font-bold ${signup ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}>Create account</button></div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {signup && <div className="grid grid-cols-2 gap-3"><Field label="First name" name="firstName" value={form.firstName} onChange={update} required/><Field label="Last name" name="lastName" value={form.lastName} onChange={update}/></div>}
        <Field label="Email address" name="emailId" type="email" value={form.emailId} onChange={update} placeholder="you@example.com" required autoComplete="email"/>
        <Field label="Password" name="password" type="password" value={form.password} onChange={update} placeholder={signup ? "Use a strong password" : "Enter your password"} required minLength={signup ? 8 : undefined} autoComplete={signup ? "new-password" : "current-password"}/>
        {signup && <><div className="grid grid-cols-2 gap-3"><Field label="Age" name="age" type="number" min="18" max="100" value={form.age} onChange={update} placeholder="18+"/><label className="block"><span className="mb-1.5 block text-xs font-bold text-stone-600">Gender</span><select name="gender" value={form.gender} onChange={update} className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm outline-none focus:border-rose-400"><option value="">Select</option>{GENDERS.map((gender) => <option key={gender} value={gender}>{gender[0].toUpperCase() + gender.slice(1)}</option>)}</select></label></div><Field label="Skills" name="skills" value={form.skills} onChange={update} placeholder="React, Node.js, TypeScript" hint="Separate skills with commas"/></>}
        {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
        <button disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-500 text-sm font-extrabold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-600 disabled:opacity-60">{busy ? <span className="loading loading-spinner loading-sm"/> : signup ? "Create my account" : "Sign in"}<span>→</span></button>
      </form><p className="mt-6 text-center text-xs leading-5 text-stone-400">By continuing, you agree to keep this community kind, respectful, and collaborative.</p>
    </div></section>
  </div>;
}

function Field({ label, hint, ...props }) { return <label className="block"><span className="mb-1.5 block text-xs font-bold text-stone-600">{label}</span><input {...props} className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-stone-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"/>{hint && <span className="mt-1 block text-[11px] text-stone-400">{hint}</span>}</label>; }
