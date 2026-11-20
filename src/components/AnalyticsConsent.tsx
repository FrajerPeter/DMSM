import React, { useEffect, useState } from 'react';
import { analytics } from '../utils/analytics';

const CONSENT_KEY = 'fp-drop-analytics-consent';

export const AnalyticsConsent: React.FC = () => {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved === 'granted' || saved === 'denied' ? saved : null;
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const configured = analytics.hasConfiguredProviders();

  useEffect(() => {
    if (choice === 'granted') analytics.initialize(true);
    if (choice === 'denied') analytics.revokeConsent();
  }, [choice]);

  const saveChoice = (next: 'granted' | 'denied') => {
    localStorage.setItem(CONSENT_KEY, next);
    setChoice(next);
    setSettingsOpen(false);
  };

  if (!configured && !settingsOpen) return null;

  return (
    <>
      {configured && choice === null && (
        <aside className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-3xl border border-neutral-700 bg-neutral-950 p-5 text-white shadow-2xl" aria-label="Nastavenia analytických cookies">
          <h2 className="font-bold uppercase">Analytika webu</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Google Analytics 4 a Microsoft Clarity sa spustia iba po tvojom súhlase. Môžeš ich odmietnuť; nákupné funkcie webu to neovplyvní.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => saveChoice('granted')} className="bg-white px-4 py-2 text-sm font-bold text-black">Povoliť analytiku</button>
            <button onClick={() => saveChoice('denied')} className="border border-neutral-600 px-4 py-2 text-sm">Odmietnuť</button>
          </div>
        </aside>
      )}
      <div className="fixed bottom-4 right-4 z-[60]">
        <button onClick={() => setSettingsOpen(open => !open)} className="border border-neutral-700 bg-neutral-950 px-3 py-2 text-[11px] font-mono text-neutral-300 shadow-lg" aria-expanded={settingsOpen}>
          Nastavenie analytiky
        </button>
        {settingsOpen && (
          <div className="mt-2 w-72 border border-neutral-700 bg-neutral-950 p-4 text-sm text-white shadow-2xl">
            <p className="text-neutral-300">GA4: {analytics.isConfigured('ga4') ? 'nastavené' : 'nenastavené'} · Clarity: {analytics.isConfigured('clarity') ? 'nastavené' : 'nenastavené'}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => saveChoice('granted')} className="bg-white px-3 py-2 text-xs font-bold text-black">Povoliť</button>
              <button onClick={() => saveChoice('denied')} className="border border-neutral-600 px-3 py-2 text-xs">Odmietnuť / odvolať</button>
            </div>
            <button onClick={() => setSettingsOpen(false)} className="mt-3 text-xs text-neutral-400 underline">Zavrieť</button>
          </div>
        )}
      </div>
    </>
  );
};
