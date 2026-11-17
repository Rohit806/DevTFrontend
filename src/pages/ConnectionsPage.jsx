import { useCallback, useEffect, useState } from "react";
import Avatar from "../Components/Avatar";
import Notice from "../Components/Notice";
import PageHeading from "../Components/PageHeading";
import { api } from "../lib/api";
import { fullName, getErrorMessage } from "../lib/format";

export default function ConnectionsPage() {
  const [people, setPeople] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async (showLoading = true) => { if (showLoading) { setLoading(true); setError(""); } try { setPeople(await api.connections()); } catch (err) { setError(getErrorMessage(err)); } finally { setLoading(false); } }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(false); }, [load]);
  return <><PageHeading eyebrow="Your network" title="Good things start here." subtitle="Your accepted connections, all in one place. Keep the conversation going and see what you can build together."/><Notice error={error} onRetry={load}/>{loading ? <div className="grid min-h-72 place-items-center"><span className="loading loading-spinner loading-lg text-rose-500"/></div> : people.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{people.map((person) => <article key={person._id} className="flex items-center gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm"><Avatar person={person} size="lg"/><div className="min-w-0 flex-1"><h2 className="truncate text-lg font-extrabold">{fullName(person)}</h2><p className="mt-1 text-xs text-stone-500">Developer · Connected</p><div className="mt-3 flex flex-wrap gap-1.5">{(person.skills || []).slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-bold text-stone-500">{skill}</span>)}</div></div><span className="text-emerald-500">●</span></article>)}</div> : !error && <div className="grid min-h-72 place-items-center rounded-3xl border border-dashed border-stone-300 bg-white/60 p-8 text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600">⌘</span><h2 className="mt-4 text-xl font-extrabold">Your network starts with one hello</h2><p className="mt-2 text-sm text-stone-500">Accept a request or meet someone new in Discover.</p></div></div>}</>;
}
