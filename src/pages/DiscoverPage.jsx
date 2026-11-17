import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Components/Avatar";
import Notice from "../Components/Notice";
import PageHeading from "../Components/PageHeading";
import { fullName } from "../lib/format";
import { loadFeed, sendConnectionRequest } from "../store/feedSlice";

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const { people, status, actionStatus, error, notice } = useSelector((state) => state.feed);
  const loading = status === "loading";
  const action = actionStatus === "loading";
  useEffect(() => { dispatch(loadFeed()); }, [dispatch]);
  function decide(status) {
    const person = people[0];
    if (!person || action) return;
    dispatch(sendConnectionRequest({ status, userId: person._id }));
  }
  const person = people[0];
  return (
    <>
      <PageHeading
        eyebrow="The community"
        title="Find your people."
        subtitle="Meet developers who share your curiosity. A thoughtful connection can turn a side project into something bigger."
        right={
          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-500">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            A little inspiration for today
          </div>
        }
      />
      {notice && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {notice}
        </div>
      )}
      <Notice error={error} onRetry={() => dispatch(loadFeed())} />
      {loading ? (
        <div className="grid min-h-[460px] place-items-center">
          <span className="loading loading-spinner loading-lg text-rose-500" />
        </div>
      ) : error ? null : person ? (
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-32px_rgba(53,39,31,.20)]">
          <div className="grid md:grid-cols-[.9fr_1.1fr]">
            <div className="relative flex min-h-[310px] flex-col items-center justify-center overflow-hidden bg-[#f5e9df] p-10 md:min-h-[500px]">
              <div className="absolute -left-16 -top-20 h-60 w-60 rounded-full bg-rose-200/60 blur-3xl" />
              <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl" />
              <div className="relative grid h-56 w-56 place-items-center rounded-full border border-white/70 bg-white/50 shadow-inner">
                <Avatar
                  person={person}
                  size="xl"
                  className="h-40 w-40 text-5xl"
                />
              </div>
              <div className="relative mt-7 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-bold text-stone-600 backdrop-blur">
                ✦ New face in the community
              </div>
            </div>
            <div className="flex flex-col p-7 sm:p-10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      {fullName(person)}
                      {person.age ? (
                        <span className="ml-2 font-medium text-stone-400">
                          {person.age}
                        </span>
                      ) : null}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm text-stone-500">
                    {person.gender
                      ? `${person.gender[0].toUpperCase() + person.gender.slice(1)} developer`
                      : "Developer in the community"}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                  OPEN TO CONNECT
                </span>
              </div>
              <div className="my-8 h-px bg-stone-100" />
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-stone-400">
                A little about their toolkit
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {person.skills?.length ? (
                  person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#f5f3f0] px-3.5 py-2 text-xs font-bold text-stone-600"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-stone-400">
                    This developer hasn’t added their skills yet.
                  </p>
                )}
              </div>
              <div className="mt-auto pt-10">
                <p className="mb-4 text-center text-xs text-stone-400">
                  How would you like to meet them?
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => decide("ignored")}
                    disabled={action}
                    title="Pass"
                    className="grid h-14 w-14 place-items-center rounded-full border border-stone-200 text-2xl text-stone-400 transition hover:border-stone-300 hover:bg-stone-50 disabled:opacity-50"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => decide("interested")}
                    disabled={action}
                    className="flex h-14 flex-1 max-w-[220px] items-center justify-center gap-2 rounded-full bg-rose-500 text-sm font-extrabold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-600 disabled:opacity-50"
                  >
                    <span className="text-lg">♡</span> Say hello
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-stone-400">
            {people.length} {people.length === 1 ? "developer" : "developers"}{" "}
            in your queue
          </p>
        </div>
      ) : (
        <div className="mx-auto grid min-h-[420px] max-w-2xl place-items-center rounded-[2rem] border border-dashed border-stone-300 bg-white/60 p-8 text-center">
          <div>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-rose-50 text-3xl text-rose-500">
              ✦
            </span>
            <h2 className="mt-5 text-2xl font-extrabold">
              You’re all caught up.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
              There aren’t any new developers to discover right now. Come back
              soon and see who joins.
            </p>
            <button
              onClick={() => dispatch(loadFeed())}
              className="mt-6 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-bold hover:border-rose-300"
            >
              Refresh feed
            </button>
          </div>
        </div>
      )}
    </>
  );
}
