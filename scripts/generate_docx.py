"""Compatibility launcher for the maintained private DOCX generator."""
import shutil
import subprocess
from pathlib import Path

node = shutil.which("node")
if not node:
    raise SystemExit("Node.js is required to generate the project document.")
script = Path(__file__).with_name("generate_docx_official.cjs")
subprocess.run([node, str(script)], check=True)
