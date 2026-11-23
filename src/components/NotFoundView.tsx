import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NotFoundViewProps {
  path?: string;
  onGoHome: () => void;
  onGoShop: () => void;
  onGoBlog: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ path, onGoHome, onGoShop, onGoBlog }) => (
  <section className="min-h-[70vh] bg-[#070707] px-4 py-20 text-neutral-100 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">CHYBA 404</p>
      <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl">
        Táto stránka neexistuje.
      </h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
        Adresa {path && <code className="break-all bg-neutral-900 px-1.5 py-0.5 font-mono text-neutral-200">{path}</code>} sa na webe FP DROP nenachádza.
        Možno bol odkaz zle napísaný alebo sa stránka presunula.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={onGoHome} className="inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-mono font-bold uppercase text-black hover:bg-neutral-200">
          Na úvodnú stránku <ArrowRight size={14} />
        </button>
        <button onClick={onGoShop} className="border border-neutral-700 px-5 py-3 text-xs font-mono font-bold uppercase text-neutral-200 hover:border-white hover:text-white">
          Do obchodu
        </button>
        <button onClick={onGoBlog} className="border border-neutral-700 px-5 py-3 text-xs font-mono font-bold uppercase text-neutral-200 hover:border-white hover:text-white">
          Na blog
        </button>
      </div>
    </div>
  </section>
);
