"""
FP DROP — Python Mobile App Simulator (Web/Local Server Mode)
Fakulta podnikatelská VUT v Brně
Spustiteľné priamo vo VS Code bez akýchkoľvek externých GUI ovládačov.
"""

import http.server
import socketserver
import json
import webbrowser
import threading
import sys
import os

from data import PRODUCTS, DROPS, STUDENT_PROFILE, TRIGGER_SYSTEM

PORT = 5050

HTML_PAGE = """<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>FP DROP Mobile Prototype (Python / VS Code)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #050505;
      color: #f5f5f5;
      font-family: 'Space Grotesk', -apple-system, sans-serif;
      margin: 0;
      padding: 0;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    /* Hide scrollbars */
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
    .iphone-frame {
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 0 12px #1c1c1e, 0 0 0 14px #2c2c2e;
    }
  </style>
</head>
<body class="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-2 sm:p-6 select-none">

  <!-- Desktop header bar -->
  <div class="mb-4 text-center max-w-md w-full flex items-center justify-between text-xs font-mono text-neutral-400 px-2">
    <div class="flex items-center gap-2 text-white font-bold">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>FP DROP MOBILE (VS CODE PYTHON)</span>
    </div>
    <span class="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[11px] text-neutral-300">
      PORT: %PORT%
    </span>
  </div>

  <!-- Mobile Device Frame (iPhone 16 Pro mockup) -->
  <div class="iphone-frame relative w-full max-w-[390px] h-[810px] bg-black rounded-[52px] overflow-hidden flex flex-col border-[4px] border-neutral-700">
    
    <!-- Dynamic Island & Status Bar -->
    <div class="h-11 bg-black flex items-center justify-between px-7 shrink-0 text-[11px] font-mono text-neutral-400 z-50">
      <span id="clock" class="font-bold text-white">09:41</span>
      <!-- Dynamic Island pill -->
      <div class="w-24 h-6 bg-neutral-900 rounded-full flex items-center justify-between px-3 border border-neutral-800/80">
        <span class="w-2 h-2 rounded-full bg-neutral-800"></span>
        <span class="text-[9px] text-emerald-400 font-bold">FP 001</span>
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="text-[10px]">5G</span>
        <div class="w-5 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
          <div class="w-full h-full bg-white rounded-2xs"></div>
        </div>
      </div>
    </div>

    <!-- Mobile App Header -->
    <div class="h-12 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 flex items-center justify-between shrink-0 z-40">
      <div class="flex items-center gap-2">
        <span class="font-black text-sm tracking-wider text-white font-mono">FP DROP</span>
        <span class="text-[9px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono">VUT BRNO</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="switchTab('cart')" class="relative p-2 text-neutral-300 hover:text-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <span id="cart-badge" class="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black font-mono font-bold text-[8px] rounded-full flex items-center justify-center">0</span>
        </button>
      </div>
    </div>

    <!-- Screen Content Container (Scrollable) -->
    <div id="screen-container" class="flex-1 overflow-y-auto bg-black p-4 space-y-4 pb-20">
      <!-- Injected by JavaScript -->
    </div>

    <!-- Floating Toast / Notification -->
    <div id="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white text-black font-mono font-bold text-xs px-4 py-2 rounded-full shadow-2xl border border-neutral-200 transition-opacity duration-300 opacity-0 pointer-events-none z-50">
      Pridané do košíka!
    </div>

    <!-- Bottom Navigation Bar (iOS Tab Bar) -->
    <div class="absolute bottom-0 inset-x-0 h-16 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 px-3 flex items-center justify-around z-40">
      <button onclick="switchTab('home')" id="tab-home" class="flex flex-col items-center gap-1 text-white font-mono text-[9px] font-bold">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span>HOME</span>
      </button>

      <button onclick="switchTab('shop')" id="tab-shop" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-white font-mono text-[9px]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        <span>SHOP</span>
      </button>

      <button onclick="switchTab('drops')" id="tab-drops" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-white font-mono text-[9px]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span>DROPS</span>
      </button>

      <button onclick="switchTab('wishlist')" id="tab-wishlist" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-white font-mono text-[9px]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        <span>WISHLIST</span>
      </button>

      <button onclick="switchTab('profile')" id="tab-profile" class="flex flex-col items-center gap-1 text-neutral-400 hover:text-white font-mono text-[9px]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span>PROFIL</span>
      </button>
    </div>

    <!-- Home Indicator bar -->
    <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full pointer-events-none z-50"></div>
  </div>

  <div class="mt-4 text-xs font-mono text-neutral-500 text-center">
    Prototyp pre záverečnú prácu / projekt • FP VUT Brno • Vyvinuté v Pythone pre VS Code
  </div>

  <script>
    // Data passed from Python
    const PRODUCTS = %PRODUCTS_JSON%;
    const DROPS = %DROPS_JSON%;
    const PROFILE = %PROFILE_JSON%;

    let currentTab = 'home';
    let currentCategory = 'ALL';
    let cart = [];
    let wishlist = ['prod-01', 'prod-13'];
    let selectedProduct = null;

    function updateTime() {
      const now = new Date();
      document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    setInterval(updateTime, 1000);
    updateTime();

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.remove('opacity-0');
      t.classList.add('opacity-100');
      setTimeout(() => {
        t.classList.remove('opacity-100');
        t.classList.add('opacity-0');
      }, 2000);
    }

    function updateCartBadge() {
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      document.getElementById('cart-badge').innerText = count;
    }

    function toggleWishlist(id, e) {
      if (e) e.stopPropagation();
      const idx = wishlist.indexOf(id);
      if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast('Odstránené z wishlistu');
      } else {
        wishlist.push(id);
        showToast('Uložené do wishlistu ❤️');
      }
      render();
    }

    function addToCart(product, size = 'L') {
      const existing = cart.find(i => i.id === product.id && i.size === size);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, size, quantity: 1 });
      }
      updateCartBadge();
      showToast(`+1 ${product.name} (${size})`);
      render();
    }

    function switchTab(tab) {
      currentTab = tab;
      selectedProduct = null;
      ['home', 'shop', 'drops', 'wishlist', 'profile', 'cart'].forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) {
          if (t === tab) {
            el.className = 'flex flex-col items-center gap-1 text-white font-mono text-[9px] font-bold';
          } else {
            el.className = 'flex flex-col items-center gap-1 text-neutral-400 hover:text-white font-mono text-[9px]';
          }
        }
      });
      render();
    }

    function openProduct(p) {
      selectedProduct = p;
      render();
    }

    function render() {
      const container = document.getElementById('screen-container');

      // Product detail screen
      if (selectedProduct) {
        container.innerHTML = `
          <div class="space-y-4">
            <button onclick="selectedProduct=null; render()" class="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white">
              ← SPÄŤ NA PREHĽAD
            </button>
            <div class="aspect-square bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden relative">
              <img src="${selectedProduct.image}" class="w-full h-full object-cover">
              <span class="absolute top-3 left-3 bg-white text-black font-mono font-bold text-[9px] px-2 py-0.5 uppercase">
                ${selectedProduct.status}
              </span>
            </div>
            <div>
              <div class="text-[10px] font-mono uppercase tracking-widest text-neutral-400">${selectedProduct.category}</div>
              <h2 class="font-extrabold text-xl uppercase tracking-tight text-white mt-0.5">${selectedProduct.name}</h2>
              <div class="font-mono text-lg font-bold text-white mt-1">${selectedProduct.price} Kč</div>
            </div>
            <div class="text-xs text-neutral-300 bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl space-y-1">
              <div class="font-bold text-white">Špecifikácia:</div>
              <div>• ${selectedProduct.material}</div>
              <div>• ${selectedProduct.fit}</div>
              <div>• Skladom: ${selectedProduct.stockCount} ks (Kolejní 29, Brno)</div>
            </div>
            <div>
              <div class="text-[10px] font-mono text-neutral-400 uppercase mb-1.5">Zvoľte veľkosť:</div>
              <div class="flex gap-2">
                ${selectedProduct.sizes.map(s => `
                  <button onclick="addToCart(selectedProduct, '${s}')" class="flex-1 py-2 bg-neutral-900 hover:bg-white hover:text-black border border-neutral-700 text-xs font-mono font-bold transition-colors rounded">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
            <button onclick="addToCart(selectedProduct, '${selectedProduct.sizes[0]}')" class="w-full py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors rounded-xl shadow-lg mt-2">
              + PRIDAŤ DO KOŠÍKA (${selectedProduct.price} Kč)
            </button>
          </div>
        `;
        return;
      }

      // 1. HOME TAB
      if (currentTab === 'home') {
        container.innerHTML = `
          <!-- Hero Drop Banner -->
          <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2.5 relative overflow-hidden">
            <div class="flex items-center justify-between text-[10px] font-mono">
              <span class="text-white font-bold bg-neutral-800 px-2 py-0.5 rounded">DROP 001 LIVE</span>
              <span class="text-emerald-400 flex items-center gap-1 font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                SKLADEM V BRNĚ
              </span>
            </div>
            <h1 class="font-black text-2xl uppercase tracking-tight text-white leading-tight">
              FIRST SEMESTER UNIFORM
            </h1>
            <p class="text-xs text-neutral-300">
              Limitovaná streetwear kolekcia pre študentov Fakulty podnikateľskej VUT v Brne.
            </p>
            <button onclick="switchTab('shop')" class="w-full py-2.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl">
              PREZRIEŤ CELÚ KOLEKCIU →
            </button>
          </div>

          <!-- Quick Promo Slogan -->
          <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
            <div class="text-xs font-mono">
              <div class="text-neutral-400 text-[10px]">ŠTUDENTSKÝ KÓD:</div>
              <div class="text-white font-bold tracking-wider">${PROFILE.couponCode} (10% SLEVA)</div>
            </div>
            <button onclick="showToast('Kód skopírovaný!');" class="text-xs font-mono px-2.5 py-1 bg-neutral-800 border border-neutral-700 text-white rounded hover:bg-neutral-700">
              KOPÍROVAŤ
            </button>
          </div>

          <!-- Featured Items -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-xs font-mono uppercase text-neutral-400">Najpredávanejšie kúsky</h3>
              <button onclick="switchTab('shop')" class="text-[10px] font-mono text-neutral-400 hover:text-white">Všetko →</button>
            </div>
            <div class="grid grid-cols-2 gap-2.5">
              ${PRODUCTS.slice(0, 4).map(p => `
                <div onclick="openProduct(PRODUCTS.find(x => x.id === '${p.id}'))" class="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 space-y-2 cursor-pointer hover:border-neutral-600 transition-colors">
                  <div class="aspect-square bg-neutral-950 rounded-lg overflow-hidden relative">
                    <img src="${p.image}" class="w-full h-full object-cover">
                    <button onclick="toggleWishlist('${p.id}', event)" class="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full text-white">
                      ${wishlist.includes(p.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div>
                    <div class="font-bold text-xs uppercase text-white truncate">${p.name}</div>
                    <div class="font-mono text-xs font-bold text-neutral-300 mt-0.5">${p.price} Kč</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        return;
      }

      // 2. SHOP TAB
      if (currentTab === 'shop') {
        const filtered = currentCategory === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.category === currentCategory);
        container.innerHTML = `
          <!-- Categories Filter Bar -->
          <div class="flex gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            ${['ALL', 'T-SHIRTS', 'HOODIES', 'ACCESSORIES'].map(cat => `
              <button onclick="currentCategory='${cat}'; render()" class="px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${currentCategory === cat ? 'bg-white text-black font-bold border-white' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-2 gap-2.5">
            ${filtered.map(p => `
              <div onclick="openProduct(PRODUCTS.find(x => x.id === '${p.id}'))" class="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 space-y-2 cursor-pointer hover:border-neutral-600 transition-colors flex flex-col justify-between">
                <div>
                  <div class="aspect-square bg-neutral-950 rounded-lg overflow-hidden relative">
                    <img src="${p.image}" class="w-full h-full object-cover">
                    <span class="absolute top-1.5 left-1.5 bg-black/80 font-mono text-[8px] font-bold text-white px-1.5 py-0.5 rounded">
                      ${p.status}
                    </span>
                  </div>
                  <div class="mt-2">
                    <div class="text-[9px] font-mono text-neutral-500 uppercase">${p.category}</div>
                    <div class="font-bold text-xs uppercase text-white line-clamp-1">${p.name}</div>
                    <div class="font-mono text-xs font-bold text-white mt-1">${p.price} Kč</div>
                  </div>
                </div>
                <button onclick="event.stopPropagation(); addToCart(PRODUCTS.find(x => x.id === '${p.id}'), '${p.sizes[0]}')" class="w-full py-1.5 bg-neutral-800 hover:bg-white hover:text-black border border-neutral-700 text-[10px] font-mono font-bold text-white transition-colors rounded">
                  + PRIDAŤ
                </button>
              </div>
            `).join('')}
          </div>
        `;
        return;
      }

      // 3. DROPS TAB
      if (currentTab === 'drops') {
        container.innerHTML = `
          <div class="space-y-3">
            <h2 class="font-black text-lg uppercase text-white font-mono">EDÍCIE & DROPY (FP VUT)</h2>
            ${DROPS.map(d => `
              <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">${d.code}</span>
                  <span class="${d.status === 'LIVE' ? 'text-emerald-400 font-bold' : 'text-neutral-400'}">${d.date} • ${d.status}</span>
                </div>
                <h3 class="font-extrabold text-base uppercase text-white">${d.title}</h3>
                <p class="text-xs text-neutral-300 leading-relaxed">${d.description}</p>
                <div class="text-[10px] font-mono text-neutral-400 italic">„${d.campaignHeadline}“</div>
              </div>
            `).join('')}
          </div>
        `;
        return;
      }

      // 4. WISHLIST TAB
      if (currentTab === 'wishlist') {
        const wishlisted = PRODUCTS.filter(p => wishlist.includes(p.id));
        container.innerHTML = `
          <div class="space-y-3">
            <h2 class="font-black text-lg uppercase text-white font-mono">OBLÚBENÉ (${wishlisted.length})</h2>
            ${wishlisted.length === 0 ? `
              <div class="text-center py-12 text-neutral-400 text-xs font-mono">
                Nemáte žiadne uložené kúsky.
              </div>
            ` : `
              <div class="space-y-2.5">
                ${wishlisted.map(p => `
                  <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between gap-3">
                    <img src="${p.image}" class="w-14 h-14 object-cover rounded-lg">
                    <div class="flex-1 min-w-0">
                      <div class="font-bold text-xs uppercase text-white truncate">${p.name}</div>
                      <div class="font-mono text-xs text-neutral-300">${p.price} Kč</div>
                    </div>
                    <button onclick="addToCart(PRODUCTS.find(x => x.id === '${p.id}'), '${p.sizes[0]}')" class="px-2.5 py-1.5 bg-white text-black text-xs font-mono font-bold rounded">
                      KOŠÍK
                    </button>
                    <button onclick="toggleWishlist('${p.id}')" class="text-neutral-500 hover:text-red-400 p-1">
                      ✕
                    </button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
        return;
      }

      // 5. PROFILE TAB
      if (currentTab === 'profile') {
        container.innerHTML = `
          <div class="space-y-3">
            <div class="rounded-lg border border-amber-800 bg-amber-950 p-2 text-[10px] font-mono text-amber-200">DEMO PROFIL — osobné údaje, ISIC aj objednávky sú fiktívne ukážky.</div>
            <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-white text-black font-black font-mono text-base rounded-full flex items-center justify-center">
                  PO
                </div>
                <div>
                  <h3 class="font-bold text-sm text-white">${PROFILE.name}</h3>
                  <div class="text-[10px] font-mono text-emerald-400">${PROFILE.loyaltyLevel}</div>
                  <div class="text-[10px] font-mono text-neutral-400">ISIC: ${PROFILE.isic}</div>
                </div>
              </div>
              <div class="pt-2 border-t border-neutral-800 text-xs space-y-1 text-neutral-300">
                <div><strong>Fakulta:</strong> ${PROFILE.faculty}</div>
                <div><strong>Program:</strong> ${PROFILE.studyProgram}</div>
                <div><strong>Kampus:</strong> ${PROFILE.campusLocation}</div>
                <div><strong>Získané ECTS kredity:</strong> ${PROFILE.ectsCredits}</div>
              </div>
            </div>

            <!-- Order history -->
            <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
              <div class="font-bold text-xs font-mono uppercase text-neutral-400">Ukážková história objednávok</div>
              ${PROFILE.orderHistory.map(o => `
                <div class="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs space-y-1">
                  <div class="flex justify-between font-mono font-bold text-white">
                    <span>${o.orderId}</span>
                    <span>${o.total}</span>
                  </div>
                  <div class="text-neutral-300">${o.item}</div>
                  <div class="text-[10px] font-mono text-emerald-400">${o.status} (${o.date})</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        return;
      }

      // 6. CART & CHECKOUT TAB
      if (currentTab === 'cart') {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        container.innerHTML = `
          <div class="space-y-3">
            <h2 class="font-black text-lg uppercase text-white font-mono">KOŠÍK (${cart.length})</h2>
            ${cart.length === 0 ? `
              <div class="text-center py-12 text-neutral-400 text-xs font-mono space-y-3">
                <div>Váš košík je momentálne prázdny.</div>
                <button onclick="switchTab('shop')" class="px-4 py-2 bg-white text-black font-bold rounded">
                  NAKUPOVAŤ
                </button>
              </div>
            ` : `
              <div class="space-y-2">
                ${cart.map((item, idx) => `
                  <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between gap-3">
                    <img src="${item.image}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1 min-w-0">
                      <div class="font-bold text-xs text-white truncate">${item.name}</div>
                      <div class="text-[10px] font-mono text-neutral-400">Veľkosť: ${item.size} • ${item.quantity} ks</div>
                      <div class="text-xs font-mono font-bold text-white">${item.price * item.quantity} Kč</div>
                    </div>
                    <button onclick="cart.splice(${idx}, 1); updateCartBadge(); render()" class="text-neutral-500 hover:text-red-400 p-1">
                      ✕
                    </button>
                  </div>
                `).join('')}
              </div>

              <!-- Summary -->
              <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
                <div class="flex justify-between text-neutral-400">
                  <span>Medzisúčet:</span>
                  <span>${total} Kč</span>
                </div>
                <div class="flex justify-between text-emerald-400">
                  <span>Študentská zľava ISIC (10%):</span>
                  <span>-${Math.round(total * 0.1)} Kč</span>
                </div>
                <div class="flex justify-between text-neutral-400">
                  <span>Doprava (Kolejní 29 - Osobne):</span>
                  <span class="text-white">ZDARMA</span>
                </div>
                <div class="border-t border-neutral-800 pt-2 flex justify-between font-bold text-white text-sm">
                  <span>CELKOM:</span>
                  <span>${Math.round(total * 0.9)} Kč</span>
                </div>
              </div>

              <!-- 1-Click Checkout -->
              <button onclick="cart=[]; updateCartBadge(); showToast('Objednávka odoslaná! 🎉'); switchTab('profile');" class="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors">
                ⚡ 1-CLICK ZAPLATIŤ (${Math.round(total * 0.9)} Kč)
              </button>
            `}
          </div>
        `;
      }
    }

    render();
  </script>
</body>
</html>
"""

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            
            # Inject serialized JSON data into HTML
            rendered = HTML_PAGE.replace("%PRODUCTS_JSON%", json.dumps(PRODUCTS))
            rendered = rendered.replace("%DROPS_JSON%", json.dumps(DROPS))
            rendered = rendered.replace("%PROFILE_JSON%", json.dumps(STUDENT_PROFILE))
            rendered = rendered.replace("%PORT%", str(self.server.server_port))
            
            self.wfile.write(rendered.encode("utf-8"))
        elif self.path == "/api/products":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(PRODUCTS).encode("utf-8"))
        elif self.path == "/api/drops":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(DROPS).encode("utf-8"))
        else:
            super().do_GET()

def start_server(port=PORT):
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), CustomHTTPHandler) as httpd:
        print(f"\n=======================================================")
        print(f"🚀 FP DROP Mobile Prototype Server beží!")
        print(f"👉 Otvorte v prehliadači / VS Code: http://localhost:{port}")
        print(f"=======================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer zastavený.")
            sys.exit(0)

if __name__ == "__main__":
    start_server()
