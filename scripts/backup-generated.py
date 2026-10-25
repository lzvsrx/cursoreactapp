"""Archive Git-ignored directories as release assets, outside the repository."""
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parent.parent
output = Path(sys.argv[1]).resolve()
if output == root or root in output.parents:
    raise SystemExit('Choose a backup destination outside the workspace.')
output.mkdir(parents=True, exist_ok=True)
selected = set(sys.argv[2:])
ignored = subprocess.check_output(['git', 'ls-files', '--others', '--ignored', '--exclude-standard', '--directory'], cwd=root, text=True).splitlines()
groups = {}
for entry in ignored:
    path = Path(entry.rstrip('/'))
    if path.is_absolute() or '..' in path.parts:
        raise SystemExit('Unexpected ignored path.')
    if not (root / path).is_dir():
        raise SystemExit(f'Review ignored standalone file before publishing: {entry}')
    groups.setdefault(path.parts[0], []).append(path.as_posix())
def archive_project(item):
    project, entries = item
    archive = output / f'{project}-generated.tar.gz'
    subprocess.run(['tar', '-czf', str(archive), *entries], cwd=root, check=True)
    if archive.stat().st_size >= 2 * 1024**3:
        raise SystemExit(f'{archive.name} exceeds the GitHub Release asset limit.')
    subprocess.run(['tar', '-tzf', str(archive)], stdout=subprocess.DEVNULL, check=True)
    with archive.open('rb') as stream:
        sha = hashlib.file_digest(stream, 'sha256').hexdigest()
    print(f'Created and verified {archive.name}: {archive.stat().st_size} bytes', flush=True)
    return {'file': archive.name, 'bytes': archive.stat().st_size, 'sha256': sha, 'paths': entries}

items = [item for item in sorted(groups.items()) if not selected or item[0] in selected]
with ThreadPoolExecutor(max_workers=3) as pool:
    manifest = list(pool.map(archive_project, items))
manifest_path = output / 'manifest.json'
previous = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else []
replaced = {entry['file'] for entry in manifest}
manifest = [entry for entry in previous if entry['file'] not in replaced] + manifest
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(output, flush=True)
