import { spawn } from 'node:child_process';

const [cmd, ...args] = process.argv.slice(2);
const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: '1',
  NODE_OPTIONS:
    `${process.env.NODE_OPTIONS ?? ''} --import tsx --disable-warning=ExperimentalWarning`.trim(),
};
let real = cmd;
if (cmd === 'docs') {
  real = 'dev';
  env.DOCS_ONLY = '1';
}

const child = spawn(
  process.execPath,
  ['./node_modules/next/dist/bin/next', real, ...args],
  { stdio: 'inherit', env },
);
child.on('exit', (code) => process.exit(code ?? 1));
child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

