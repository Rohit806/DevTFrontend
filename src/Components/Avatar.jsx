import { initials } from "../lib/format";

const colors = [
  "from-orange-200 to-rose-100",
  "from-sky-200 to-indigo-100",
  "from-emerald-200 to-teal-100",
  "from-amber-200 to-orange-100",
  "from-violet-200 to-fuchsia-100",
];
export default function Avatar({ person, size = "md", className = "" }) {
  const dimensions = {
    sm: "h-10 w-10 text-xs",
    md: "h-14 w-14 text-base",
    lg: "h-24 w-24 text-2xl",
    xl: "h-28 w-28 text-3xl",
  };
  const color = colors[(person?.firstName?.charCodeAt(0) || 0) % colors.length];
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${color} font-bold text-stone-700 ring-4 ring-white ${dimensions[size]} ${className}`}
    >
      {initials(person)}
    </div>
  );
}
