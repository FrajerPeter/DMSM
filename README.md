# FP DROP

FP DROP is a student streetwear e-commerce concept for the Faculty of Business, Brno University of Technology. This repository contains the web prototype, a Python mobile-app simulator, and supporting project materials.

The shop, prices, stock, checkout, profile details, and editorial stories are demonstrations for an academic project. They do not represent an active store or real orders. VLOG items are editorial examples and should be replaced with approved contributions from real students before publication.

## Web prototype

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:3000/`). In Windows PowerShell, use `npm.cmd` if script execution blocks `npm`:

```powershell
npm.cmd install
npm.cmd run dev
```

To create a production build:

```bash
npm run build
```

GA4 and Microsoft Clarity are optional. Copy `.env.example` to `.env.local`, enter the measurement IDs, restart Vite, and allow analytics in the site's consent panel. Never commit `.env.local`.

## Python mobile prototype

The prototype is in `python_mobile_app/` and can run as a mobile-shaped web simulator using Python's standard library:

```bash
cd python_mobile_app
python main.py
```

It opens the simulator at `http://localhost:5050/`. An optional Flet version is also included; see `python_mobile_app/README.md` for its setup.

## Main folders

- `src/` — React, TypeScript, and Vite website
- `public/` and `product-assets/` — web and product images
- `python_mobile_app/` — Python mobile simulator and optional Flet app
- `assets/academic/` — project presentation visuals
- `scripts/` — project asset and document generation utilities
