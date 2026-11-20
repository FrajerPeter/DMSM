import React from 'react';
import { ArrowUpRight, MessageCircle, PenLine } from 'lucide-react';

const stories = [
  {
    number: '01',
    category: 'ŽIVOT NA FAKULTE',
    title: 'Od rannej prednášky po večerné Brno',
    intro: 'Ako sa mení študentský deň, keď sa prednášky, práca na projekte a stretnutie s kamarátmi zmestia do jedného outfitu?',
    body: 'FP DROP chce zachytiť práve tento každodenný rytmus. Oblečenie má byť pohodlné na dlhý deň a zároveň dosť osobité na to, aby ukázalo, kam patríme.',
    prompt: 'Aký je tvoj typický deň na FP?'
  },
  {
    number: '02',
    category: 'NÁZOR ŠTUDENTOV',
    title: 'Čo by sme si naozaj obliekli?',
    intro: 'Grafika na tričku je najlepšia vtedy, keď jej rozumie komunita, pre ktorú vznikla.',
    body: 'Preto chceme do ďalších návrhov zapojiť študentov: pýtať sa na motívy, farby a strihy, ktoré vystihujú fakultu bez toho, aby pôsobili ako povinná uniforma.',
    prompt: 'Ktorý motív by podľa teba patril na ďalší drop?'
  },
  {
    number: '03',
    category: 'ZO ZÁKULISIA',
    title: 'Z nápadu na študentský drop',
    intro: 'Za každým kúskom je viac než logo: nápad, spätná väzba a rozhodnutie, čo má zmysel vyrobiť.',
    body: 'V tejto rubrike chceme ukazovať proces tvorby FP DROP — od prvých skíc cez testovanie návrhov až po rozhodnutia o materiáloch a udržateľnosti.',
    prompt: 'Čo ťa zaujíma pri tvorbe kolekcie?'
  }
];

export const VlogView: React.FC = () => (
  <div className="min-h-screen bg-[#070707] text-neutral-100">
    <section className="border-b border-neutral-800 bg-[#090909] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <span className="bg-white px-2 py-1 font-bold text-black">BLOG</span>
          <span>·</span><span>PRÍBEHY A NÁZORY KOMUNITY FP</span>
        </div>
        <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">FP DROP z pohľadu študentov.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Články o značke FP DROP, jej oblečení a tom, ako vzniká študentský streetwear. Nájdeš tu aj témy a nápady, ktoré môžu ovplyvniť ďalšie kolekcie.
        </p>
        <div className="mt-6 max-w-3xl border border-amber-900/70 bg-amber-950/30 p-4 text-xs leading-relaxed text-amber-200">
          Ukážkový obsah pre školský prototyp. Texty nižšie sú redakčné koncepty, nie autentické výpovede konkrétnych študentov. Pred publikovaním ich nahraďte rozhovormi a príspevkami so súhlasom autorov.
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mb-7 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
        <PenLine size={14} /><span>ŠTUDENTSKÉ TÉMY</span><span>·</span><span>3 UKÁŽKOVÉ PRÍSPEVKY</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <article key={story.number} className="flex flex-col border border-neutral-800 bg-neutral-950 p-6 transition-colors hover:border-neutral-600">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              <span>{story.category}</span><span>{story.number} / 03</span>
            </div>
            <h2 className="mt-8 font-display text-xl font-bold uppercase leading-snug text-white">{story.title}</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-200">{story.intro}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{story.body}</p>
            <div className="mt-6 border-t border-neutral-800 pt-4">
              <p className="text-xs text-neutral-500">OTÁZKA PRE KOMUNITU</p>
              <p className="mt-1 text-sm text-white">{story.prompt}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 border border-neutral-800 bg-neutral-950 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-3">
          <MessageCircle size={19} className="mt-0.5 shrink-0 text-neutral-300" />
          <div>
            <h2 className="font-display text-lg font-bold uppercase text-white">Tvoj hlas sem patrí</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-400">Pri ostrej verzii sem doplníme redakčný formulár alebo kontakt, cez ktorý môžu študenti posielať svoje príspevky.</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 border border-neutral-700 px-4 py-3 text-xs font-mono uppercase text-neutral-300">
          PRIPRAVENÉ PRE PRÍSPEVKY <ArrowUpRight size={14} />
        </span>
      </div>
    </section>
  </div>
);
