import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Components/Avatar";
import Notice from "../Components/Notice";
import PageHeading from "../Components/PageHeading";
import { fullName } from "../lib/format";
import { loadRequests, reviewRequest } from "../store/requestsSlice";

export default function RequestsPage() {
  const dispatch = useDispatch();
  const { items: requests, status, actionId: busyId, error, notice: message } = useSelector((state) => state.requests);
  const loading = status === "loading";
  useEffect(() => { dispatch(loadRequests()); }, [dispatch]);
  function review(requestId, status) { dispatch(reviewRequest({ requestId, status })); }
  return <><PageHeading eyebrow="Your inbox" title="People who said hello." subtitle="Someone is interested in connecting. Take a look at their profile and decide if it feels like a match."/><Notice error={error} onRetry={() => dispatch(loadRequests())}/>{message && <div className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div>}
    {loading ? <div className="grid min-h-72 place-items-center"><span className="loading loading-spinner loading-lg text-rose-500"/></div> : requests.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{requests.map((request) => { const person = request.fromUserId || {}; return <article key={request._id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-4"><Avatar person={person} size="lg"/><div><h2 className="text-lg font-extrabold">{fullName(person)}</h2><p className="mt-1 text-xs font-semibold text-rose-500">Wants to connect</p></div></div><div className="my-5 h-px bg-stone-100"/><p className="text-sm leading-6 text-stone-500">A new connection could be the beginning of a great build.</p><div className="mt-6 flex gap-2"><button disabled={busyId === request._id} onClick={() => review(request._id, "rejected")} className="flex-1 rounded-xl border border-stone-200 py-2.5 text-sm font-bold text-stone-500 hover:bg-stone-50 disabled:opacity-50">Pass</button><button disabled={busyId === request._id} onClick={() => review(request._id, "accepted")} className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-bold text-white hover:bg-rose-600 disabled:opacity-50">{busyId === request._id ? "Saving…" : "Accept"}</button></div></article>; })}</div> : !error && <div className="grid min-h-72 place-items-center rounded-3xl border border-dashed border-stone-300 bg-white/60 p-8 text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-2xl text-rose-500">♡</span><h2 className="mt-4 text-xl font-extrabold">No new hellos yet</h2><p className="mt-2 text-sm text-stone-500">When another developer is interested, you’ll find them here.</p></div></div>}</>;
}
