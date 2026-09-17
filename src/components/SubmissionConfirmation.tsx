import { CheckCircle2, Home, ArrowLeft } from 'lucide-react';
import type { Category, Service, RequestDraft } from '@/types';
import { speedOptions } from '@/config';
import type { SpeedOption } from '@/types';

interface SubmissionConfirmationProps {
  category: Category;
  service: Service;
  draft: RequestDraft;
  submitted: boolean;
  error: string | null;
  onBack: () => void;
  onDone: () => void;
}

const speedLabels: Record<SpeedOption, string> = speedOptions.reduce(
  (acc, opt) => ({ ...acc, [opt.id]: opt.label }),
  {} as Record<SpeedOption, string>
);

const materialLabels: Record<string, string> = {
  self: 'Mám vlastný',
  needed: 'Potrebujem',
  unknown: 'Neviem',
};

export default function SubmissionConfirmation({
  category,
  service,
  draft,
  submitted,
  error,
  onBack,
  onDone,
}: SubmissionConfirmationProps) {
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Požiadavka odoslaná!</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-300">
            Ďakujem, {draft.customerName.trim()}! Tvoja požiadavka na{' '}
            <span className="font-semibold text-emerald-400">{service.name}</span> mi prišla.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-lg font-semibold text-emerald-300">
              Dohodneme sa v škole
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Pozriem si tvoju požiadavku a dohodneme sa na cene a termíne osobne v škole.
              {draft.proposedPrice.trim() && (
                <>
                  {' '}
                  Tvoja navrhovaná cena ({draft.proposedPrice.trim()} €) sa berie ako návrh —
                  konečnú cenu potvrdím ja.
                </>
              )}
            </p>
          </div>
          <button
            onClick={onDone}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:-translate-y-0.5"
          >
            <Home size={18} />
            Späť na domov
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Niečo sa pokazilo</h1>
          <p className="mt-4 text-base text-slate-300">
            Nepodarilo sa odoslať požiadavku. Skús to prosím znova.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              Späť k formuláru
            </button>
            <button
              onClick={onDone}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400"
            >
              <Home size={18} />
              Domov
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-emerald-400" />
        <h1 className="text-2xl font-bold text-white">Odosielam požiadavku…</h1>
        <p className="mt-3 text-sm text-slate-400">Počkaj chvíľku.</p>
      </div>
    </div>
  );
}
