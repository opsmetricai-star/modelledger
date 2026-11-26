"use client";
import { useFormState } from "react-dom";

type State = { key?: string; error?: string };

export default function NewKey({ action }: { action: (prev: State, fd: FormData) => Promise<State> }) {
  const [state, formAction] = useFormState<State, FormData>(action, {});
  return (
    <div className="mt-4">
      <form action={formAction} className="flex flex-wrap gap-3">
        <input name="name" placeholder="Key name" className="input !w-56" />
        <button className="btn btn-primary !py-2.5">Create key</button>
      </form>
      {state.error && <p className="mt-2 text-sm text-red-400">{state.error}</p>}
      {state.key && (
        <div className="mt-3 rounded-md border border-lime/40 bg-lime/10 p-3">
          <p className="text-sm text-lime-soft">Copy this key now. It will not be shown again.</p>
          <code className="mt-1 block break-all font-mono text-sm">{state.key}</code>
        </div>
      )}
    </div>
  );
}
