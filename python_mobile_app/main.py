#!/usr/bin/env python3
"""
FP DROP — Mobilný Prototyp pre VS Code (Python)
Fakulta podnikatelská VUT v Brně

Hlavný spúšťač aplikácie.
Spustenie vo VS Code:
    F5  alebo  python main.py
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
    print("  Dostupné režimy:")
    print("  [1] Web Mobile Simulator (zero dependencies, beží okamžite)")
    print("  [2] Flet Flutter App (vyžaduje: pip install flet)")
    print("  [3] CustomTkinter GUI (vyžaduje: pip install customtkinter)")
    print("=" * 60)

def run_web(port=5050):
    print(f"\n[+] Štartujem lokálny Web Mobile Server na porte {port}...")
    from app_web import start_server
    # Open browser automatically after a short delay
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
        print("\n[+] Spúšťam Flet Mobile App...")
        ft.app(target=flet_main)
    except ImportError:
        print("\n[!] Knižnica 'flet' nie je nainštalovaná.")
        print("    Spustite: pip install flet")
        print("    Prepínam na Web Mobile Simulator...\n")
        run_web()

def main():
    parser = argparse.ArgumentParser(description="FP DROP Mobile Prototype")
    parser.add_argument("--flet", action="store_true", help="Spustiť vo Flet (Flutter) režime")
    parser.add_argument("--web", action="store_true", help="Spustiť lokálny webový mobilný simulátor")
    parser.add_argument("--port", type=int, default=5050, help="Port pre webový simulátor (predvolené 5050)")
    args = parser.parse_args()

    print_banner()

    if args.flet:
        run_flet()
    else:
        # Default zero-dependency runnable mode
        run_web(port=args.port)

if __name__ == "__main__":
    main()
