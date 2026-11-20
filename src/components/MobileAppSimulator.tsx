import React, { useState } from 'react';
import { Home, Grid, Zap, Heart, User, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, X, Code2, Download, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { DROPS } from '../data/drops';
import { ProductImage } from './ProductImage';
import { Product } from '../types';
import { analytics } from '../utils/analytics';

interface MobileAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  cartCount: number;
}

const PYTHON_MAIN_CODE = `#!/usr/bin/env python3
"""
FP DROP — Mobilný Prototyp pre VS Code (Python)
Fakulta podnikatelská VUT v Brně

Spustenie vo VS Code:
    Klávesa F5  alebo  python main.py
"""

import sys
import os
import argparse
import webbrowser

def print_banner():
    print("=" * 60)
    print("  FP DROP — MOBILNÝ PROTOTYP (VS CODE / PYTHON)")
    print("  Fakulta podnikatelská VUT v Brně • Kolejní 29")
    print("=" * 60)
    print("  [1] Web Mobile Simulator (Zero dependencies, okamžité)")
    print("  [2] Flet Flutter App (vyžaduje: pip install flet)")
    print("=" * 60)

def run_web(port=5050):
    print(f"\\n[+] Štartujem lokálny Web Mobile Server na porte {port}...")
    from app_web import start_server
    def open_browser():
        import time
        time.sleep(1)
        webbrowser.open(f"http://localhost:{port}")
    import threading
    threading.Thread(target=open_browser, daemon=True).start()
    start_server(port=port)

def run_flet():
    try:
        import flet as ft
        from app_flet import main as flet_main
        print("\\n[+] Spúšťam Flet Mobile App...")
        ft.app(target=flet_main)
    except ImportError:
        print("\\n[!] Knižnica 'flet' nie je nainštalovaná (pip install flet).")
        print("    Prepínam na Web Mobile Simulator...\\n")
        run_web()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--flet", action="store_true", help="Flet Flutter mód")
    args = parser.parse_args()
    print_banner()
    if args.flet:
        run_flet()
    else:
        run_web()
`;

const PYTHON_DATA_CODE = `"""
FP DROP — Mobilná aplikácia (Dáta & Katalóg)
Fakulta podnikatelská VUT v Brně
"""

DROPS = [
    {
        "id": "drop-001",
        "code": "DROP 001",
        "title": "FIRST SEMESTER",
        "subtitle": "Nová energia. Čistá tabule. Tvůj univerzitní uniform.",
        "date": "ZÁŘÍ 2026",
        "status": "LIVE",
        "themeColor": "#ffffff",
        "campaignHeadline": "YOUR UNIVERSITY. YOUR UNIFORM."
    },
    {
        "id": "drop-002",
        "code": "DROP 002",
        "title": "EXAM SEASON",
        "subtitle": "Kofein v krvi, deadliny v kalendáři a mikina jako útočiště.",
        "date": "LEDEN 2027",
        "status": "COMING_SOON",
        "themeColor": "#d4d4d4",
        "campaignHeadline": "NO SLEEP. JUST DEADLINES."
    }
]

PRODUCTS = [
    {
        "id": "prod-01",
        "name": "HOT GIRLS GO TO FP TEE",
        "slogan": "HOT GIRLS\\nGO TO FP",
        "category": "T-SHIRTS",
        "price": 349,
        "status": "LIMITED",
        "color": "Černá (Pure Jet Black)",
        "fit": "Oversized Boxy Fit",
        "material": "100% česaná bio bavlna (240 g/m²)",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "stockCount": 14,
        "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-13",
        "name": "FP 001 SIGNATURE HOODIE",
        "slogan": "FP 001\\nSIGNATURE",
        "category": "HOODIES",
        "price": 799,
        "status": "LIMITED",
        "color": "Černá (Pitch Black)",
        "fit": "Heavyweight Relaxed Boxy",
        "material": "80% bavlna, 20% recyklovaný polyester (420 g/m²)",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "stockCount": 9,
        "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    }
]

STUDENT_PROFILE = {
    "name": "Alex Novák (demo)",
    "isic": "DEMO-ISIC-0001",
    "faculty": "Fakulta podnikatelská VUT v Brně",
    "studyProgram": "Informační management & Podnikání",
    "campusLocation": "Kolejní 29, 612 00 Brno",
    "ectsCredits": 142,
    "loyaltyLevel": "VIP SENIOR (10% SLEVA)",
    "couponCode": "FPVUT10"
}
`;

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  wishlistIds,
  cartCount
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'DEVICE' | 'PYTHON'>('DEVICE');
  const [activeTab, setActiveTab] = useState<'HOME' | 'SHOP' | 'DROPS' | 'WISHLIST' | 'PROFILE'>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPythonFile, setSelectedPythonFile] = useState<'main' | 'data' | 'flet'>('main');
  const [copied, setCopied] = useState(false);

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));
  const filteredProducts = selectedCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className={`relative z-10 flex flex-col items-center w-full transition-all duration-300 ${mode === 'PYTHON' ? 'max-w-2xl' : 'max-w-sm'}`}>

        {/* Mode switcher header */}
        <div className="w-full flex items-center justify-between pb-3 px-2 text-xs font-mono text-neutral-400 gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg">
            <button
              onClick={() => setMode('DEVICE')}
              className={`px-2.5 py-1 text-xs font-bold transition-colors rounded ${
                mode === 'DEVICE' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              📱 Mobilný Simulátor
            </button>
            <button
              onClick={() => setMode('PYTHON')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold transition-colors rounded ${
                mode === 'PYTHON' ? 'bg-emerald-500 text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 size={13} />
              <span>🐍 Python (VS Code)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white"
            aria-label="Zavrieť simulátor"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. PYTHON VS CODE MODE */}
        {mode === 'PYTHON' && (
          <div className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 text-neutral-200 space-y-4 max-h-[82vh] overflow-y-auto">
            {/* Header with Download */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <Terminal size={14} />
                  <span>Python 3.10+ • VS Code Prototyp</span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-white mt-1">
                  FP DROP MOBILE APP V PYTHONE
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Pripravené na okamžité spustenie vo Visual Studio Code stlačením F5.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="/fp_drop_full_web_project.zip"
                  download="fp_drop_full_web_project.zip"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg"
                  title="Stiahnuť celý web (React, Vite, TypeScript) do VS Code"
                >
                  <Download size={13} />
                  <span>CELÝ WEB DO VS CODE (.ZIP)</span>
                </a>
                <a
                  href="/fp_drop_mobile_python.zip"
                  download="fp_drop_mobile_python.zip"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg"
                  title="Stiahnuť prototyp Python mobilnej aplikácie"
                >
                  <Download size={13} />
                  <span>PYTHON APP (.ZIP)</span>
                </a>
              </div>
            </div>

            {/* Quick start instructions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-2 text-xs font-mono">
              <div className="text-white font-bold flex items-center gap-1.5">
                <span>⚡ Rýchle spustenie vo VS Code:</span>
              </div>
              <div className="bg-black border border-neutral-800 rounded p-2.5 text-neutral-300 space-y-1">
                <div className="text-neutral-500"># 1. Rozbaľte stiahnutý ZIP a otvorte priečinok vo VS Code:</div>
                <div className="text-emerald-400 font-bold">code python_mobile_app</div>
                <div className="text-neutral-500 mt-2"># 2. Spustite aplikáciu (stlačte F5 alebo v termináli):</div>
                <div className="text-emerald-400 font-bold">python main.py</div>
              </div>
              <p className="text-[11px] text-neutral-400">
                Aplikácia sa automaticky otvorí v prehliadači ako interaktívny iPhone 16 Pro mobilný simulátor na <span className="text-white">http://localhost:5050</span>.
              </p>
            </div>

            {/* Code file tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded text-xs font-mono">
                  <button
                    onClick={() => setSelectedPythonFile('main')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedPythonFile === 'main' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    main.py
                  </button>
                  <button
                    onClick={() => setSelectedPythonFile('data')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedPythonFile === 'data' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    data.py
                  </button>
                </div>

                <button
                  onClick={() => handleCopyCode(selectedPythonFile === 'main' ? PYTHON_MAIN_CODE : PYTHON_DATA_CODE)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono rounded"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'SKOPÍROVANÉ' : 'KOPÍROVAŤ KÓD'}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="bg-black border border-neutral-800 rounded-xl p-3 font-mono text-xs overflow-x-auto max-h-64 text-neutral-300 leading-relaxed">
                <pre>{selectedPythonFile === 'main' ? PYTHON_MAIN_CODE : PYTHON_DATA_CODE}</pre>
              </div>
            </div>
          </div>
        )}

        {/* 2. DEVICE INTERACTIVE SIMULATOR */}
        {mode === 'DEVICE' && (
          <div className="w-full h-[760px] max-h-[85vh] bg-[#000] border-[8px] border-neutral-800 rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative select-none">
            {/* Dynamic Island & Status Bar */}
            <div className="h-10 bg-black flex items-center justify-between px-7 shrink-0 text-[11px] font-mono text-neutral-400 z-30">
              <span>09:41</span>
              <div className="w-24 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-neutral-800 rounded-full mr-2" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
              <span>5G 100%</span>
            </div>

            {/* App Top App Bar */}
            <div className="h-12 bg-[#0d0d0d] border-b border-neutral-800/80 px-4 flex items-center justify-between shrink-0 z-20">
              <span className="font-display font-black text-sm tracking-wider text-white">
                FP DROP
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                  BRNO
                </span>
              </div>
            </div>

            {/* Screen Content Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-[#0a0a0a] text-neutral-100 p-4 space-y-5">
              {/* SCREEN: HOME */}
              {activeTab === 'HOME' && (
                <div className="space-y-4">
                  {/* Hero Drop Widget */}
                  <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                      <span className="text-white font-bold">NÁVRH DROP 001</span>
                      <span className="text-emerald-400">● UKÁŽKA</span>
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-white uppercase leading-tight">
                      FIRST SEMESTER
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans">
                      Návrh študentského oblečenia. Materiál a parametre sú ukážkové.
                    </p>
                    <button
                      onClick={() => setActiveTab('SHOP')}
                      className="w-full py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 mt-2"
                    >
                      POZRIEŤ NÁVRH
                    </button>
                  </div>

                  {/* Top Sellers Grid */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        Výber tímu
                      </h4>
                      <button
                        onClick={() => setActiveTab('SHOP')}
                        className="text-xs font-mono text-white flex items-center gap-1"
                      >
                        Vše <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTS.slice(0, 4).map(p => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="bg-neutral-900/60 border border-neutral-800 p-2 space-y-1.5 cursor-pointer hover:border-neutral-700 transition-colors"
                        >
                          <div className="aspect-square bg-neutral-950 overflow-hidden relative">
                            <ProductImage
                              imageUrl={p.imageUrl}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-1 left-1 text-[8px] font-mono font-bold bg-white text-black px-1">
                              {p.price} Kč
                            </span>
                          </div>
                          <div className="text-[11px] font-bold uppercase truncate text-white">
                            {p.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SCREEN: SHOP */}
              {activeTab === 'SHOP' && (
                <div className="space-y-3">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
                    {['ALL', 'T-SHIRTS', 'HOODIES', 'ACCESSORIES'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 border whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* 2-Column Catalog */}
                  <div className="grid grid-cols-2 gap-2">
                    {filteredProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="bg-neutral-900/60 border border-neutral-800 p-2 space-y-1.5 cursor-pointer hover:border-neutral-700 transition-colors"
                      >
                        <div className="aspect-square bg-neutral-950 overflow-hidden relative">
                          <ProductImage
                            imageUrl={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 truncate">
                          {p.category}
                        </div>
                        <div className="text-[11px] font-bold uppercase truncate text-white leading-tight">
                          {p.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-white">
                          {p.price} Kč
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN: DROPS */}
              {activeTab === 'DROPS' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                    EDICE & KALENDÁŘ DROPU
                  </div>
                  {DROPS.map(d => (
                    <div
                      key={d.id}
                      className="p-3 bg-neutral-900 border border-neutral-800 space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-white font-bold">{d.code}</span>
                        <span className={d.status === 'LIVE' ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                          {d.status}
                        </span>
                      </div>
                      <div className="font-display font-extrabold text-sm uppercase text-white">
                        {d.title}
                      </div>
                      <p className="text-[11px] font-sans text-neutral-300">
                        {d.subtitle}
                      </p>
                      <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-800">
                        Termín: {d.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SCREEN: WISHLIST */}
              {activeTab === 'WISHLIST' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    ULOŽENÉ KUSY ({wishlistedProducts.length})
                  </div>
                  {wishlistedProducts.length === 0 ? (
                    <div className="text-center py-12 text-xs font-mono text-neutral-500 space-y-2">
                      <Heart size={24} className="mx-auto text-neutral-600" />
                      <p>Nemáš uložené žiadne obľúbené kúsky.</p>
                      <button
                        onClick={() => setActiveTab('SHOP')}
                        className="px-3 py-1.5 bg-neutral-900 text-white border border-neutral-700 text-xs"
                      >
                        POZRIEŤ OBCHOD
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {wishlistedProducts.map(p => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-2 cursor-pointer hover:border-neutral-700"
                        >
                          <div className="w-12 h-12 bg-neutral-950 shrink-0">
                            <ProductImage
                              imageUrl={p.imageUrl}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold uppercase truncate text-white">
                              {p.name}
                            </div>
                            <div className="text-xs font-mono text-neutral-400">
                              {p.price} Kč
                            </div>
                          </div>
                          <span className="text-xs font-mono text-white underline">
                            ZOBRAZIT
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SCREEN: PROFILE */}
              {activeTab === 'PROFILE' && (
                <div className="space-y-4 text-xs font-mono">
                  <div className="border border-amber-900/70 bg-amber-950/30 p-2 text-[9px] font-mono text-amber-200">
                    UKÁŽKOVÝ PROFIL — všetky osobné údaje a objednávky sú fiktívne.
                  </div>
                  {/* Student badge */}
                  <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white text-black font-bold flex items-center justify-center text-sm font-display">
                        FP
                      </div>
                      <div>
                        <div className="text-white font-bold uppercase">Alex Novák</div>
                        <div className="text-[10px] text-emerald-400">UKÁŽKOVÉ OVERENIE • 10 % ZĽAVA</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-neutral-400 pt-2 border-t border-neutral-800">
                      ISIC: DEMO-ISIC-0001 • Fakulta podnikateľská
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1">
                    <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                      <span>História nákupov</span>
                      <ArrowRight size={12} />
                    </div>
                    <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                      <span>Osobný odber Kolejní 29</span>
                      <span className="text-emerald-400 font-bold">UKÁŽKA</span>
                    </div>
                    <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                      <span>Nastavenie upozornení na dropy</span>
                      <span className="text-white">UKÁŽKA</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Native Mobile Bottom Navigation Bar */}
            <div className="h-16 bg-[#0d0d0d] border-t border-neutral-800/80 px-4 flex items-center justify-around shrink-0 text-[10px] font-mono z-30">
              <button
                onClick={() => setActiveTab('HOME')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'HOME' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Home size={18} />
                <span>DOMOV</span>
              </button>

              <button
                onClick={() => setActiveTab('SHOP')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'SHOP' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Grid size={18} />
                <span>OBCHOD</span>
              </button>

              <button
                onClick={() => setActiveTab('DROPS')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'DROPS' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Zap size={18} />
                <span>DROP</span>
              </button>

              <button
                onClick={() => setActiveTab('WISHLIST')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'WISHLIST' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Heart size={18} />
                <span>OBĽÚBENÉ</span>
              </button>

              <button
                onClick={() => setActiveTab('PROFILE')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'PROFILE' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <User size={18} />
                <span>PROFIL</span>
              </button>
            </div>

            {/* iPhone Home Indicator bar */}
            <div className="h-4 bg-[#0a0a0a] flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-neutral-700 rounded-full" />
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-neutral-400 text-center">
          <span>Python Prototyp pre VS Code & Flutter/Web</span>
          <span>•</span>
          <a
            href="/fp_drop_mobile_python.zip"
            download="fp_drop_mobile_python.zip"
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            <Download size={11} />
            <span>Stiahnuť .zip</span>
          </a>
        </div>
      </div>
    </div>
  );
};
