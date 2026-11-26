export function Mark({ className = "" }: { className?: string }) {
  const cols = [0, 1, 2];
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 28 36" className={className} aria-hidden>
      {cols.map((c) =>
        rows.map((r) => (
          <circle key={`${c}${r}`} cx={4 + c * 10} cy={4 + r * 9} r="2.6" fill={(c + r) % 2 ? "#3DDC84" : "#2FD1A0"} opacity={r === 3 && c === 0 ? 0.35 : 1} />
        ))
      )}
    </svg>
  );
}

export function ProductIcon({ kind }: { kind: string }) {
  const c = "#3DDC84";
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {kind === "chat" && (
        <>
          <rect x="3" y="4" width="22" height="16" rx="4" fill={c} stroke="none" />
          <path d="M9 20v4l5-4" fill={c} stroke="none" />
          <circle cx="9" cy="12" r="1.3" fill="#22252b" stroke="none" />
          <circle cx="14" cy="12" r="1.3" fill="#22252b" stroke="none" />
          <circle cx="19" cy="12" r="1.3" fill="#22252b" stroke="none" />
        </>
      )}
      {kind === "bars" && (
        <>
          <rect x="4" y="15" width="5" height="9" rx="1.5" fill={c} stroke="none" />
          <rect x="12" y="9" width="5" height="15" rx="1.5" fill={c} stroke="none" />
          <rect x="20" y="3" width="5" height="21" rx="1.5" fill={c} stroke="none" />
        </>
      )}
      {kind === "play" && (
        <>
          <circle cx="14" cy="14" r="11" />
          <path d="M11.5 9.5l8 4.5-8 4.5z" fill={c} />
        </>
      )}
      {kind === "search" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M18 18l7 7" />
          <path d="M8 10h8M8 14h6" />
        </>
      )}
    </svg>
  );
}

export const Chevron = () => (
  <svg viewBox="0 0 12 8" className="h-2.5 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M1 1.5l5 5 5-5" />
  </svg>
);

export const Check = () => (
  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0" fill="none" stroke="#3DDC84" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 8.5l3.2 3L13 4.5" />
  </svg>
);

export const Dot = ({ ok = true }: { ok?: boolean }) => (
  <span aria-hidden className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-lime" : "bg-red-400"}`} />
);
