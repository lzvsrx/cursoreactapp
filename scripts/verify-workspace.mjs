import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

export const projects = ['lzdev', 'portfolio-lzdev/web', 'portfolio-lzdev', 'react-native-bat-pass-generator', 'react-native-bat-sinal', 'trilha-react-native-components', 'trilha-react-native-expo-events', 'trilha-react-native-flexbox', 'trilha-react-native-green-latern-app', 'trilha-react-native-hooks', 'navigation-base-repo', 'trilha-react-native-navigation-stack', 'trilha-react-native-navigation-tabs', 'trilha-react-native-navigation-drawer'];
const root = resolve(import.meta.dirname, '..');
const logDir = join(tmpdir(), 'cursoreactapp-verification');
await mkdir(logDir, { recursive: true });
const results = [];
let next = 0;
async function command(project, args) {
  const started = Date.now();
  const output = await new Promise(resolveResult => {
    const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
      cwd: join(root, project), shell: process.platform === 'win32', env: { ...process.env, CI: '1' },
    });
    let log = '';
    child.stdout.on('data', chunk => { log += chunk; });
    child.stderr.on('data', chunk => { log += chunk; });
    child.on('error', error => { log += error.message; });
    child.on('close', code => resolveResult({ code, log }));
  });
  const label = args.join(' ');
  const filename = `${project.replaceAll('/', '-')}-${args.join('-').replaceAll(':', '-')}.log`;
  await writeFile(join(logDir, filename), output.log);
  results.push({ project, command: `npm ${label}`, code: output.code, seconds: Math.round((Date.now() - started) / 1000), log: filename });
  await writeFile(join(logDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`${output.code === 0 ? 'PASS' : 'FAIL'} ${project}: npm ${label}`);
}
async function worker() {
  while (next < projects.length) {
    const project = projects[next++];
    const web = project === 'lzdev' || project.endsWith('/web');
    for (const task of web ? ['build', 'test', 'test:api'] : ['typecheck', ...(['react-native-bat-sinal', 'trilha-react-native-hooks'].includes(project) ? ['test'] : []), 'doctor', 'export:web', 'export:android', 'export:ios']) {
      await command(project, ['run', task]);
    }
    await command(project, ['audit', '--json']);
  }
}
await Promise.all([worker(), worker()]);
await writeFile(join(logDir, 'results.json'), JSON.stringify(results, null, 2));
console.log(`Logs: ${logDir}`);
if (results.some(result => result.code !== 0 && !result.command.includes('audit'))) process.exitCode = 1;
