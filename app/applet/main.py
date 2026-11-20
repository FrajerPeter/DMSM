#!/usr/bin/env python3
"""
FP DROP — Root Launcher for VS Code & Terminal
Fakulta podnikatelská VUT v Brně
Automaticky spustí mobilný prototyp z python_mobile_app/
"""

import os
import sys

# Pridáme priečinok python_mobile_app do Python PATH
current_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(current_dir, "python_mobile_app")

if os.path.exists(app_dir):
    sys.path.insert(0, app_dir)
    os.chdir(app_dir)
    from main import main
    main()
else:
    # Ak bol súbor spustený priamo v python_mobile_app
    from main import main
    main()
